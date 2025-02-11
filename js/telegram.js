// Replace these with your actual Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

async function sendToTelegram(bookingData) {
    const message = `
🆕 New Booking!

Tour: ${bookingData.tourName}
Price: $${bookingData.price}
Customer: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Date: ${bookingData.date}
Guests: ${bookingData.guests}
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Telegram');
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        alert('There was an error processing your booking. Please try again later.');
    }
}