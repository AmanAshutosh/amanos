let users = [];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { mobile } = req.body;

  let user = users.find((u) => u.mobile === mobile);

  if (!user) {
    user = {
      id: Date.now().toString(),
      mobile,
    };

    users.push(user);
  }

  res.status(200).json({
    userId: user.id,
  });
}
