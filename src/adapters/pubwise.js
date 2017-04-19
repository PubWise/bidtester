var CONSTANTS = require('../constants.json');
var utils = require('../utils.js');
var bidfactory = require('../bidfactory.js');
var bidmanager = require('../bidmanager.js');
var adloader = require('../adloader');

var PubwiseAdapter = function PubwiseAdapter() {
    var pubwiseUrl = "adtest.pubwise.io/api/v1/bid/get";

    $$PREBID_GLOBAL$$.pubwiseResponseHandler = pubwiseResponseHandler;

    return {
        callBids: _callBids
    };

    function _callBids(bidReqs) {
        utils.logInfo('pubwise callBids adapter beginning');

        var domain = window.location.host;
        var page = window.location.pathname + location.search + location.hash;

        var pubwiseBidReqs = {
            id: utils.getUniqueIdentifierStr(),
            bids: bidReqs,
            site: {
                domain: domain,
                page: page
            }
        };

        var scriptUrl = 'http://' + pubwiseUrl + '?callback=$$PREBID_GLOBAL$$.pubwiseResponseHandler' +
            '&src=' + CONSTANTS.REPO_AND_VERSION +
            '&bidpayload=' + encodeURIComponent(JSON.stringify(pubwiseBidReqs));

        adloader.loadScript(scriptUrl);
        utils.logInfo('pubwise callBids complete');
    }

    function pubwiseResponseHandler(pubwiseResponseObject) {
        utils.logInfo('pubwise ResponseHandler beginning');
        utils.logInfo('Response Object',pubwiseResponseObject);
        var placements = [];

        if (isResponseInvalid()) {
            console.log('invalid response');
            return fillPlacementEmptyBid();
        }

        pubwiseResponseObject.bids.forEach(pushPubwiseBid);
        var allBidResponse = fillPlacementEmptyBid(placements);
        utils.logInfo('pubwise Response handler complete');

        return allBidResponse;

        function isResponseInvalid() {
            return !pubwiseResponseObject || !pubwiseResponseObject.bids || !Array.isArray(pubwiseResponseObject.bids) || pubwiseResponseObject.bids.length <= 0;
        }

        function pushPubwiseBid(pubwiseBid) {
            utils.logInfo('Pubwsie Bid',pubwiseBid);
            utils.logInfo('Pubwise Reqs',$$PREBID_GLOBAL$$._bidsRequested.find(bidSet => bidSet.bidderCode === 'pubwise'));
            var placementCode = '';

            var bidReq = $$PREBID_GLOBAL$$
                ._bidsRequested.find(bidSet => bidSet.bidderCode === 'pubwise')
                .bids.find(bid => bid.bidId === pubwiseBid.bidId);

            if (!bidReq) {
                utils.logMessage('PubWise No bidReq');
                return pushErrorBid(placementCode);
            }

            bidReq.status = CONSTANTS.STATUS.GOOD;
            utils.logInfo('Bid Request',bidReq);
            placementCode = bidReq.placementCode;
            placements.push(placementCode);

            var cpm = pubwiseBid.cpm;

            if (!cpm) {
                utils.logMessage('PubWise No CPM');
                return pushErrorBid(placementCode);
            }

            var bid = bidfactory.createBid(1, bidReq);

            bid.creative_id = pubwiseBid.id;
            bid.bidderCode = 'pubwise';
            bid.cpm = cpm;
            bid.ad = decodeURIComponent(pubwiseBid.adm);
            bid.width = parseInt(pubwiseBid.w);
            bid.height = parseInt(pubwiseBid.h);
            utils.logInfo('pushing pubwise bid');
            bidmanager.addBidResponse(placementCode, bid);
        }

        function fillPlacementEmptyBid(places) {
            console.log('Fill Placement Bids',$$PREBID_GLOBAL$$._bidsRequested);
            $$PREBID_GLOBAL$$
                ._bidsRequested.find(bidSet => bidSet.bidderCode === 'pubwise')
                .bids.forEach(fillIfNotFilled);

            function fillIfNotFilled(bid) {
                if (utils.contains(places, bid.placementCode)) {
                    return null;
                }

                pushErrorBid(bid);
            }
        }

        function pushErrorBid(bidRequest) {
            var bid = bidfactory.createBid(2, bidRequest);
            bid.bidderCode = 'pubwise';
            bidmanager.addBidResponse(bidRequest.placementCode, bid);
        }
    }
};

module.exports = PubwiseAdapter;
