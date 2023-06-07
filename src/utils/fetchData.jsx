// Options from RapidAPI for chatGPT
export const getOptions = (query) => {
  // query is a user input to API
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // 'X-RapidAPI-Key': import.meta.env.KEY_CHATGPT,
      "X-RapidAPI-Key": "a8f2a2c460mshade5cab45dbbaacp105474jsn9d9e97b7a132",
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    }),
  };
  return options;
};

/**
 * fetchData() - Returns the api response from the server
 *@constructor
 * @param {string} url The url of the API endpoint
 * @param {object} options The standard rapidAPI option
 * @return {object} returns the sum of a and b
 */

// Call to the API and get the results
export const fetchData = async (url, options) => {
  // it accepts two arguments API URL and Options if i is needed

  let data; // variable that will be passed as a return value
  // Try and run the following code
  try {
    const response = await fetch(url, options); // call api and get the data
    // Throw an error if response is failed
    if (!response.ok) {
      throw Error("Data not found");
    }
    const result = await response.json(); // get a list of objects from the api
    data = result.choices[0].message; // store the message from chatGPT
    //Catch the error if the code fails
  } catch (error) {
    console.error(error); // Output the error to console
  }

  return data;
};
