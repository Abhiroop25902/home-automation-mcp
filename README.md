# Home Automation MCP

## General Idea

Open Home Automation Access to GPTs using MCP

## General Structure

![General Structure of Project](https://github.com/Abhiroop25902/home-automation-mcp/blob/main/readme_src/program_structure.png?raw=true)

### More Info About IFTTT and iOS Shortcut Integration

1. IFTTT

   - This essentially Throws a notification with a payload of a link `shortcuts://run-shortcut?name=PlaySongViaQueryParam&input=text&text={{Value1}}`, where Value1 is a payload of form `{title: string, artist: string}`

   - ![IFTTT Shortcut](https://github.com/Abhiroop25902/home-automation-mcp/raw/refs/heads/main/readme_src/ifttt.jpg?raw=true)

2. iOS Shortcut
   - This shortcut gets executed when user interacts with the IFTTT Notification
     - This can be automated using PushCut, but its locked behind a paywall
     - HomeBridge implementation might not require this as well
   - https://github.com/Abhiroop25902/home-automation-mcp/raw/refs/heads/main/readme_src/iOS_Shortcut.mp4

## Demo

### LM Studio

https://github.com/Abhiroop25902/home-automation-mcp/raw/refs/heads/main/readme_src/LM_Studio_demo.mp4

### Phone

https://github.com/Abhiroop25902/home-automation-mcp/raw/refs/heads/main/readme_src/iPhone_demo.mp4

## Notes

- The IFTTT deployment key is linked to my Phone, hence I have obfuscated it using GCP Secret

## Future Plans

- Integrate HomeBridge to create a local server for home automation
  - This should solve "tapping the IFTTT Notification" for music playback, I would rather ask Siri Directly to play music at this point
- Tools for handling more smart home devices

## Disclaimer

This is a weekend project made for exploring MCPs, hence this is not production ready

Some Additions to possibly make it production ready

- Axios Handler File to keep all axios related functions together
  - Retry mechanism and timeout handling for axios requests
- Caching iTunes API result
- Storing MCP Session Data in a proper Database Layer rather than in-memory JS Object
- Security and Authorization in MCP Server
- Rate Limiting for the MCP Server to avoid DDOS (This might be provided by google run)
- Add Request Queue for the MCP Server to avoid overloading of Cloud Run Instance
- Logging and Observability along with Health Checks
