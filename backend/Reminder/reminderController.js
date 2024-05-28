import nodemailer from 'nodemailer';
import schedule from 'node-schedule';



export const scheduleAppointment = async (req, res) => {
    const { email, serviceName, serviceDate } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'animallpublic@gmail.com',
                pass: 'Animall1234!!'
            }
        });

        const mailOptions = {
            from: 'animallpublic@gmail.com',
            to: email,
            subject: 'Service Appointment Reminder',
            text: `This is a reminder for your service appointment "${serviceName}" on ${serviceDate}.`
        };

        
        const reminderDateMinusOneDay = new Date(serviceDate);
        reminderDateMinusOneDay.setDate(reminderDateMinusOneDay.getDate() - 1);

        schedule.scheduleJob(reminderDateMinusOneDay, () => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email reminder sent:', info.response);
                }
            });
        });

        res.status(200).json({ message: 'Reminder scheduled successfully' });

    } catch (error) {
        res.status(500).send('Error scheduling email reminder: ' + error);
    }
};
