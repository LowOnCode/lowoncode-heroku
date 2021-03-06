const loc = require('@lowoncode/runtime')
const fetch = require('node-fetch')
const fs = require('fs')

// Warning
const defaultDesignUrl = 'https://lowoncode.com/designs/hello/latest.json'
if (!process.env.DESIGN) {
  console.warn(`Set the DESIGN env to a url, now defaulting to ${defaultDesignUrl}`)
}

// Get env
const DESIGN = process.env.DESIGN || defaultDesignUrl
const MONITOR = process.env.MONITOR || true
// const MONITOR_SECRET = process.env.MONITOR_SECRET || 'verysecret'

async function main () {
  // Create a runtime instance
  const runtime = await loc.createRuntime()

  // Load my custom components
  // await runtime.addCoreComponents()
  await runtime.addComponents(`${__dirname}/components`)

  // Load design file
  console.log(`Downloading design...${DESIGN}`)
  const design = await fetch(DESIGN).then(res => res.json())
  console.log('done')

  // Start the engine
  await runtime.run(design)

  // Start monitor on our design, needed for design ui to connect to the app
  if (MONITOR) {
    const logs = `${__dirname}/tmp`

    // Make sure logs directory exist
    if (!fs.existsSync(logs)) {
      fs.mkdirSync(logs)
    }

    await loc.start(runtime, {
      logs
    })
  }

  // The monitor is live at...
  console.log(`Server live at : http://localhost:${process.env.PORT || 5000}/_system`)
}

main()
