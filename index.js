const fs = require('fs')
const craigslist = require('node-craigslist')
const moment = require('moment')
// no need to store moment-timer into its own variable; just need in scope to use with moment
require('moment-timer')
const { sendEmail, writeToErrorLogs } = require('./utils')

const clientOptions = { city: 'toronto', host: 'craigslist.ca' }
const client = new craigslist.Client(clientOptions)

const [, , minAsk = 0, maxAsk = 9999, searchQuery = ''] = process.argv

const searchOptions = {
  category: 'apa',
  minAsk: Number(minAsk),
  maxAsk: Number(maxAsk),
}

const runSearch = () =>
  client.search(searchOptions, searchQuery, async (error, results) => {
    const timer = moment.duration(45, 'minutes').timer(runSearch)

    if (error) {
      writeToErrorLogs(error, 'an error occured when querying craigslist')
      timer.start()
      return
    }

    const latestStoredResult = fs.readFileSync(
      './latestResultStored.txt',
      'utf-8'
    )

    const indexOfLastResultStored = results.findIndex(
      ({ url }) => url === latestStoredResult
    )

    const shouldSendEmail = indexOfLastResultStored !== 0
    if (shouldSendEmail) {
      const newPostings = results.slice(0, indexOfLastResultStored)
      const urls = newPostings.reduce((acc, { url }) => {
        return acc.concat(`\n${url}`)
      }, '')

      sendEmail(urls)
    } else {
      console.log('stored result is identical to last result - no email sent')
    }

    timer.start()
  })

runSearch()
