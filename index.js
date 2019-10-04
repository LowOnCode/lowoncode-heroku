const loc = require('@lowoncode/runtime')
const fetch = require('node-fetch')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

// Warning
const defaultDesignUrl = "https://designs.lowoncode.com/hello/latest.json"
if(!process.env.DESIGN) {
  console.warn(`Set the DESIGN env to a url, now defaulting to ${defaultDesignUrl}`)
}

// Get env
const DESIGN = process.env.DESIGN || defaultDesignUrl
const MONITOR = process.env.MONITOR || true
const MONITOR_SECRET = process.env.MONITOR_SECRET || 'verysecret'

async function main () {
  // Create a runtime instance
  const runtime = await loc.createRuntime()

  // Load my custom components
  await runtime.addCoreComponents()
  // await runtime.addComponents(`${__dirname}/components`)

  // Load design file
  console.log(`Downloading design...${DESIGN}`)
  const design = await fetch(DESIGN).then(res => res.json())
  console.log('done')

  // Start the engine
  await runtime.run(design)

  // Start monitor on our design
  if(MONITOR) { 
    await loc.start(runtime, {
      logs: `${__dirname}/tmp`
    })
  }
}

main()
