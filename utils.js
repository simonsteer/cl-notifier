const fs = require('fs')
const nodemailer = require('nodemailer')
const notifier = require('node-notifier')

const writeToErrorLogs = (error, message, shouldNotify) => {
  const errorMessage = `ERROR: ${message}`
  const errorLogs = fs.readFileSync('./errorLogs.txt', 'utf-8')

  fs.writeFileSync(
    './errorLogs.txt',
    errorLogs.concat(`\n\n${errorMessage}\n${JSON.stringify(error)}`),
    'utf-8'
  )

  if (shouldNotify !== 'no-notify') {
    notifier.notify({ wait: true, message: errorMessage })
  }

  console.log(`${errorMessage} - see errorLogs.txt`)
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'USER',
    pass: 'PASS',
  },
})

const EMAIL_SUCCESS_MESSAGE = 'email sent - check your inbox'

const sendEmail = async (urls, shouldNotify) => {
  const response = await transporter.sendMail({
    from: 'FROM',
    to: 'TO',
    subject: 'new listing on craigslist',
    html: urls,
  })

  if (response.accepted) {
    const mostRecentUrl = urls.split('\n')[0]
    fs.writeFileSync('./latestResultStored.txt', mostRecentUrl, 'utf-8')

    if (shouldNotify !== 'no-notify') {
      notifier.notify({ wait: true, message: EMAIL_SUCCESS_MESSAGE })
    }

    console.log(EMAIL_SUCCESS_MESSAGE)
  } else {
    writeToErrorLogs(
      response,
      'an error occurred when sending the email',
      shouldNotify
    )
  }
}

module.exports = { writeToErrorLogs, sendEmail }
