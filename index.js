const fs = require('fs')
const craigslist = require('node-craigslist')
const moment = require('moment')
// no need to store moment-timer into its own variable; just need in scope to use with moment
require('moment-timer')
const { sendEmail, writeToErrorLogs } = require('./utils')

const [
  ,
  ,
  city = 'toronto',
  category = 'sss',
  minAsk = 0,
  maxAsk = 99999,
  searchQuery = '',
  intervalDuration = 45,
  intervalUnit = 'minutes',
  shouldNotify = true,
] = process.argv

const clientOptions = { city }
const client = new craigslist.Client(clientOptions)

const searchOptions = {
  category,
  minAsk: Number(minAsk),
  maxAsk: Number(maxAsk),
}

const runSearch = () =>
  client.search(searchOptions, searchQuery, (error, results) => {
    const timer = moment
      .duration(Number(intervalDuration), intervalUnit)
      .timer(runSearch)

    if (error) {
      writeToErrorLogs(
        error,
        'an error occured when querying craigslist',
        shouldNotify
      )
      timer.start()
      return
    }

    const lastestResultStored = fs.readFileSync(
      './latestResultStored.txt',
      'utf-8'
    )

    const indexOfLatestResultStored = results.findIndex(
      ({ url }) => url === lastestResultStored
    )

    const shouldSendEmail = indexOfLatestResultStored !== 0
    if (shouldSendEmail) {
      const newPostings = results.slice(0, indexOfLatestResultStored)
      const urls = newPostings.reduce((acc, { url }) => {
        return acc.concat(`${url}\n`)
      }, '')

      sendEmail(urls, shouldNotify)
    } else {
      console.log(
        'latst result sent matches latest result queried - no email sent'
      )
    }

    timer.start()
  })

runSearch()
