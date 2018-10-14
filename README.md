# Carousell Housing

a Project using Alicloud Function Compute(serverless platform) to crawl rental housing on Carousel Singapore

## Technology

- Alicloud Function Compute with Runtime nodejs8
- FCli to manage deployment
- Typescript
- CheerioJS
- Axios

## How to run

- Ensure all the dependencies are available and ready: `npm install`
- Turn on typescript compiler: `tsc -watch`
- Run test with `nodejs dist/carousell.js`. For now tests will print output to console
- Deploy onto Alicloud using FCLI (commands in package.json are for MacOS only, Ubuntu linux are a bit different and requires using fcli manually for now)

## TDB

- [ ] Time-based trigger definition
- [ ] History persistent to avoid duplicate notification on same listing
- [ ] Re-configure search conditions
- [X] Carousell crawl script
- [X] Function compute TypeScript definition
- [X] Dingtalk Chatbot TypeScript definition
