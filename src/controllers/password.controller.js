import sgMail from '@sendgrid/mail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import database from '../database/models';
import { errorResponse, successResponse, serverError } from '../helpers/response';
import { generateToken } from '../helpers/auth';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = database;

/**
 * Generates token password reset mail successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return errorResponse(res, 404, 'Email address does not match any account');
  }
  const token = await generateToken({ id: user.id, email }, '1hr');
  const url = process.env.NODE_ENV === 'development' || 'test'
    ? `${process.env.SITE_URL}/${token}`
    : `${process.env.PRODUCTION_URL}/${token}`;
  const mailOptions = {
    to: user.email,
    from: process.env.SENDER_EMAIL,
    subject: 'Password Reset',
    text: `Hi ${user.firstName} \n
    A request to reset your account password was receieved. Please click on the following link ${url} to reset your password. \n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  try {
    sgMail.send(mailOptions);
    return successResponse(res, 200, 'A reset link has been sent to your email');
  } catch (error) {
    return errorResponse(res, 404, 'An error occured');
  }
};
/**
  * Reset password successfully
  *
  * @param {obj} req The request object
  * @param {obj} res The response object
  * @returns {json} The response from db or error.
*/
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return errorResponse(res, 400, 'Invalid token, please provide a valid token');
    }
    return decoded;
  });
  if (!user) {
    return errorResponse(res, 400, 'Password reset token is invalid or might have expired');
  }

  try {
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: user.id,
        },
      },
    );

    return successResponse(res, 200, 'Password reset successfully');
  } catch (err) {
    return serverError(res);
  }
};
