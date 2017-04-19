# PubWise.io Bidtester

## What is it?

The PubWise.io BidTester is a Prebid.js compatible bid adapter which allows you to fully test your Prebid.js implementation.

## Who built it?

The Bidtester was built by the team at PubWise.io to test configurations for our users and our own Header Bidding implementations.

## How do I include it in my Prebid?

1. Register for an account at http://www.pubwise.io
2. Get the /src/adapters/pubwise.js adapter file and add it to your Prebid.js project in the same location
3. Add pubwise to your adapters.json file
4. Build your custom Prebid now bundled with the PubWise adpter

Note: We are working to have our adapter included directly with the Prebid download, but it is not currently available in that manner.

## How do I send bids?

In your PubWise.io account backend click on the "Testing" link for your site. Sample code will be provided there with the proper IDs. The basic format and options are described below so you can customize by hand once you get the hang of it.

{
  bidder: "pubwise",
  params: {
      site_id: 'from_pubwise_backend_ui',
      width: 320,
      height: 50,
      cpm: 20,
      delay: 0
  }
}

### Params Documentation

| Param Name | Valid Types | Description |
| ___ | ___ |
| site_id | string | GUID from PubWise.io backend, unique to each site. |
| width | integer | Width for the requested ad unit. |
| height | integer | Height for the requested ad unit. |
| cpm | float | CPM float in dollars that you would like returned. |
| delay | integer | Millseconds to add to call return. Useful for simulating timeouts or other longer response scenarios. |


