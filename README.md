# PubWise.io Bidtester

## What is it?

The PubWise.io BidTester is a Prebid.js compatible bid adapter which allows you to fully test your Prebid.js implementation.

## Who built it?

The Bidtester was built by the team at PubWise.io to test configurations for our users and our own Header Bidding implementations.

## How do I use it?

### First Get An account

1. Register for an account at http://www.pubwise.io
2. Add your site, add name, URL, etc.
3. You will see a link to "testing" after the site is created

### Add the PubWise.io Adapter into your Prebid

1. Get the /src/adapters/pubwise.js adapter file and add it to your Prebid.js project in the same location
2. Add pubwise to your adapters.json file
3. Build your custom Prebid

Note: We are working to have our adapter included directly with the Prebid download, but it is not currently available in that manner.

### Send Bids and Get Test Ads in Response

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


