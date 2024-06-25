import { Request, Response } from 'express';
import { google } from 'googleapis';
import { config } from '../../config/config';

const oAuth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
);

export const googleAuth = (req: Request, res: Response) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
  });
  res.redirect(authUrl);
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  if (!code) {
    return res.status(400).send('Missing code parameter');
  }
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Save tokens to the database or session
    res.send('Authentication successful! You can close this tab.');
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Authentication failed');
  }
};

export const listMessages = async (req: Request, res: Response) => {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
    });
    const messages = response.data.messages || [];
    for (const message of messages) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id as string,
      });
      if (msg.data && msg.data.snippet) {
        console.log(`Snippet: ${msg.data.snippet}`);
      }
    }
    res.send('Emails retrieved successfully!');
  } catch (error) {
    console.error('Error listing messages:', error);
    res.status(500).send('Failed to retrieve emails');
  }
};
