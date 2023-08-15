
import { User } from '../dbmodels/user.js';
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



export const isAuthenticated = async ( req, res,  next) => {

    try {


        if (req.headers) {
            let token;
            token = await req.headers["x-auth-token"]
            if (!token) {
                return res.status(400).json({ message: "access denied" })
            } else {
                const decode = jwt.verify(token, process.env.SECRET_KEY);
                req.user = await User.findById(decode.id).select('id name ')
                console.log(req.user)
                next()
            }


        }



    } catch (error) {
        console.log('server error', error)
        return res.status(500).json({ message: 'internal server error' })

    }





}

 export const sendMail = async options =>{
    //here we create the transporter for forgot password link
    
      const transporter = nodemailer.createTransport({
         service: 'gmail',
        auth: {
          user:process.env.USER,
          pass:process.env.PASS
        }
      });

      //this mailoptions for the which messge want you to send the user

      const mailOptions = {
        from:process.env.USER,
        to: options.email,
        subject: 'Reset the password',
        text: options.message
      };
      //here is the catching error field
      
      transporter.sendMail(mailOptions, (error) => {
        if (error) {

          console.error('The mail doesnot send the user', error);
          return res.status(500).json({ error: 'mail doesnot send successfully' });
        }
        return res.status(200).json({ message: 'Email sent successfully' });
      });
}



