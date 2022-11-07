import prismaClient from '../../prisma'
import { Expo } from 'expo-server-sdk';
import { compare } from 'bcryptjs'
import moment from 'moment';

class SendPushNotificationService {
    async execute(user: string, password: string, title: string, body: string, data?: string) {

        const userTokens = await prismaClient.appConstants.findFirst({
            where: {
                id: 1
            },
            select: {
                root_access: true,
                users: true,
                last_push_notification: true
            }
        })

        const passwordMatch = await compare(password, userTokens.root_access)
        const userMatch = userTokens.users === user

        if (passwordMatch && userMatch) {
            try {

                const lastPushNotificationInDB = await prismaClient.appConstants.findFirst({
                    where: {
                        id: 1
                    },
                    select: {
                        last_push_notification: true
                    }
                })

                const diffOfLastPushNotificationInSeconds = moment().diff(lastPushNotificationInDB.last_push_notification, 'seconds')

                if (diffOfLastPushNotificationInSeconds < 3600) {
                    throw new Error('Volte em 1 hora')
                }

                const userTokens = await prismaClient.pushTokens.findMany({
                    select: { token: true }
                })

                let expo = new Expo();

                let messages = [];

                for (let pushToken of userTokens) {
                    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                    // Check that all your push tokens appear to be valid Expo push tokens
                    if (!Expo.isExpoPushToken(pushToken.token)) {
                        console.error(`Push token ${pushToken.token} is not a valid Expo push token`);
                        continue;
                    }

                    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                    messages.push({
                        to: pushToken.token,
                        sound: 'default',
                        title,
                        body,
                        data,
                    })
                }

                let chunks = expo.chunkPushNotifications(messages);
                let tickets = [];
                (async () => {
                    // Send the chunks to the Expo push notification service. There are
                    // different strategies you could use. A simple one is to send one chunk at a
                    // time, which nicely spreads the load out over time:
                    for (let chunk of chunks) {
                        try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            tickets.push(...ticketChunk);
                            // NOTE: If a ticket contains an error code in ticket.details.error, you
                            // must handle it appropriately. The error codes are listed in the Expo
                            // documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })();

                await prismaClient.appConstants.update({
                    data: {
                        last_push_notification: moment().format()
                    },
                    where: {
                        id: 1
                    }
                })

                return {
                    message: 'Notificações enviadas!',
                    total: messages.length
                }
            } catch (e) {
                throw new Error(e)
            }
        } else {
            throw new Error('Usuário/ senha incorreto(s)')
        }
    }
}

export { SendPushNotificationService };