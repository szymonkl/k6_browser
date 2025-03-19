import { browser } from 'k6/browser';
const MailosaurClient = require('mailosaur')

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
    await page.screenshot({ path: 'screenshots/screenshot.png' });
    const mailosaurClient = new MailosaurClient('abcd');
    const mailosaur = new MailosaurClient('API_KEY');
    const serverId = 'abc123'
    const serverDomain = 'abc123.mailosaur.net'
  
    const searchCriteria = {
      sentTo: 'anything@' + serverDomain
    }
    
    const message = await mailosaur.messages.get(serverId, searchCriteria)
  
    console.log(message.subject)
  } finally {
    await page.close();
  }
}