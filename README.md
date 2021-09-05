# Telnyx Sample SMS App

## Description

This app demonstrates a simple messaging scenario using [Telnyx's SMS Messaging API](https://telnyx.com/products/programmable-sms) on the [NestJS](https://nestjs.com) framework.

## Requirements

- You will need [Node](https://nodejs.org/en/) v14 or greater installed.
- For development, ngrok will allow Telynx web hooks to call into your app. Visit the [Telnyx Guide on Getting ngrok Setup](https://developers.telnyx.com/docs/v2/development/ngrok) for more info.

## Setup

### Telnyx Setup

You will need to create a Telnyx account, obtain a phone number, and set up a messaging profile to get started. Follow this [guide](https://developers.telnyx.com/docs/v2/messaging/quickstarts/portal-setup) for information on how to do so.

### Repo and Installation

Clone the GitHub repo and install the dependencies:

```bash
$ git clone https://github.com/elylucas/telnyx-sample.git
$ cd telnyx-sample
$ npm install
```


### Configure Local Environment Settings

You will need to create a local environment file to supply the application with some settings.

Create a .env file in the root of the project and set the API_KEY and PHONE_NUMBER variables with settings from your application. Your API key can be found under the "API Keys" side menu in the Telnyx dashboard, and the phone number is the number you set up earlier and assigned to the messaging profile for this application.

Your .env file should look something like this:

```
API_KEY=<Your API Key>
PHONE_NUMBER=<Your Telnyx Phone Number>
```

> This file does not get checked into source contol.

## Running the app

### Launch a ngrok session

```bash
$ ngrok http 3000
```
This command will tunnel any connections that come in from the forwarding URL to you local system on port 3000, which is the port that the Nest API server will listen for connections.

You will need to update your messaging profile to send webhook requests to this forwarding URL. Copy the URL and go into the messaging profile you have setup for this application in the Telynx dashboard. Paste the forwarding URL into the "Send a webhook to this URL box" and save the changes.

> Note, you will need to update this webhook URL each time you restart ngrok as the URL will change each time.

### Start API Server

In another terminal window, run one of the following:

```bash
$ npm run start:dev
```

You should now be able to send messages to your Telnyx phone number and have the app respond to the webhook reqeusts.

## Test

To run the tests, run the following:

```bash
$ npm run test
```

## Libraries Used in This Sample

- [NestJS](https://nestjs.com), a great Node web framework. Choosen because it has great features with minimal fuss.
- [Telnyx Node SDK](https://developers.telnyx.com/docs/v2/development/dev-env-setup?lang=node), used to send messages back to the Telnyx SMS API.