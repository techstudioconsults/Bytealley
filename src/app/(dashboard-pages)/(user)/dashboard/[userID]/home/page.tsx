interface UserHomePageProperties {
  params: {
    userID: string;
  };
}

const UserHomePage = ({ params }: UserHomePageProperties) => {
  const { userID } = params;
  console.log("User ID:", userID);
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>User ID: {userID}</p>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default UserHomePage;
