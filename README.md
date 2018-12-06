# cl-notifier

## Automate boring Craigslist page refreshes

Searching for stuff on Craigslist sucks; why not let Node do it for you? ( ͡° ͜ʖ ͡°)

1. Clone this repository
2. Run `npm install`
3. Edit `user`, `pass`, `to`, and `from` in `utils.js`
   - If using gmail as your client, configure your account to allow less secure apps by going [here](https://myaccount.google.com/lesssecureapps) (if you don't do this you won't be able to send yourself emails using nodemailer)
4. Run `node index.js` in your terminal with the following arguments `CITY CATEGORY MIN_PRICE MAX_PRICE SEARCH_QUERY INTERVAL_DURATION INTERVAL_UNIT`
   - You can also add `no-notify` as a final argument if you don't want desktop notifications
   - Scroll down to see some example commands
5. Do whatever you want while Node looks for stuff on Craigslist for you

Some notes:

- The very first time you run `node index.js` you'll get emailed a giant list of results. Subsequent searches will only attempt to email you new listings.

- Default CLI arguments are set up to search for general items for sale in Toronto every 45 minutes. You can easily change the defaults in `index.js` so you don't have to pass any CLI arguments if you wish.

[node-craigslist docs if you want to get more granular with your search](https://www.npmjs.com/package/node-craigslist)

[nodemailer docs for troubleshooting email issues](https://nodemailer.com/about/)

[moment docs for durations](https://momentjs.com/docs/#/durations/creating/)

### Example commands

Search for unfurnished apartments in Toronto for \$1000 - \$1500/mo every 45 minutes:

```
node index.js toronto apa 1000 1500 -furnished 45 minutes
```

Search for keyboards in Chicago for \$500 or less every three hours and opt out of desktop notifs:

```
node index.js chicago sss 0 500 keyboard 3 hours no-notify
```

Search for mid-century modern furniture in Vancouver for \$1000 or less every 20 minutes:

```
node index.js vancouver fua 0 1000 'mcm mid century modern' 20 minutes
```
