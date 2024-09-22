export const Survey = ({
  auth,
  signUserOut,
  setLanguage,
  setProficiency,
  setUserType,
  userType,
  setInQueue,
  setShowSurvey,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 border border-orange-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-orange-600">Fluent</h1>
        <h2 className="text-xl font-semibold text-orange-600 mb-6">
          Let's get you connected.
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInQueue(true);
            setShowSurvey(false);
          }}
          className="w-full max-w-md flex flex-col"
        >
          <div className="mb-6">
            <label className="text-lg font-medium text-orange-500 mb-2 block">
              User Type:
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full bg-white border-2 border-orange-400 text-orange-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-orange-500 transition duration-300 cursor-pointer"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select user type</option>
                <option value="learner">Language Learner</option>
                <option value="native">Native Speaker</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-500">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-orange-500 mb-2 block">
              Language:
            </label>
            <input
              className="w-full bg-white border-2 border-orange-400 text-orange-700 py-3 px-4 rounded-md leading-tight focus:outline-none focus:border-orange-500 transition duration-300"
              placeholder="Enter language"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-orange-500 mb-2 block">
              Language Proficiency:
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full bg-white border-2 border-orange-400 text-orange-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-orange-500 transition duration-300 cursor-pointer"
                disabled={userType === "native"}
                onChange={(e) => setProficiency(e.target.value)}
              >
                <option value="">Select proficiency</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="native" selected={userType === "native"}>
                  Native
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-500">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-md shadow hover:bg-orange-600 transition duration-300"
          >
            Enter Chat
          </button>
        </form>

        <div className="flex flex-col items-center mt-6 w-full max-w-md border border-orange-300 rounded-md p-4 bg-white shadow-md">
          <p className="text-sm font-medium text-orange-600 mb-2 block">
            Currently signed in as:
          </p>
          <h2 className="text-lg font-semibold text-orange-600 mb-2">
            {auth.currentUser.displayName}
          </h2>
          <img
            src={auth.currentUser.photoURL}
            alt="User Profile"
            className="h-16 w-16 rounded-full mb-2"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={signUserOut}
            className="text-orange-500 px-6 py-3 rounded-md hover:underline hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
