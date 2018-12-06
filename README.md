# craigslist-notifier

### automate boring craigslist page refreshes

Searching for stuff on Craigslist sucks; why not let Node do it for you? ( ͡° ͜ʖ ͡°)

1. Clone this repository
2. Run `npm install`
3. Edit configs in `utils.js` when instantiating nodemail transporter and when using said transporter to send an email
   - If using gmail as your client, configure your account to allow less secure apps by going [here](https://myaccount.google.com/lesssecureapps) (if you don't do this you won't be able to send yourself emails using nodemailer)
4. Run `node index.js` in your terminal
   - Optionally run with the following arguments `node index.js MINIMUM_PRICE MAXIMUM_PRICE SEARCH_QUERY`
5. Do whatever you want while Node looks for stuff on Craigslist for you

The very first time you run `node index.js` you'll get emailed a giant list of results. Whenever `runSearch` gets called again it will only attempt to email you new listings.

Defaults have been set to search for apartments in Toronto. This can easily be changed by modifying `clientOptions` and `searchOptions` in `index.js`.

Search happens every 45 minutes. You can change this by modifying `timer` at the top of the `runSearch` function. Don't query too often or your IP address will get blocked.

Desktop notifications are sent by default when an error occurs, and when an email is successfully sent to your inbox. You can opt out of the notifs by commenting out or deleting the `notifier.notify` lines in `utils.js`. Errors are logged in `errorLogs.txt`

[node-craigslist docs for more on craigslist query customization](https://www.npmjs.com/package/node-craigslist)
