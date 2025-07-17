import jwt from "jsonwebtoken";

async function generateToken(user) {
  try{
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }catch(error){
    throw new Error("Token generation failed");
  }
}

export default generateToken;