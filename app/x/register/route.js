export default async (req, res) => {
    try {
        console.log("req nom", req.body)
        const query = 'INSERT INTO posts(content) VALUES($1)'
        const values = [req.body.content["email"]]
        console.log(values);
      const result = await conn.query(
          query,
          values
      );
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };

// export default async function handler(req, res) {
   
//     console.log("its in");
//     if (req.method == "POST"){
//       const email= req.body['email']
//       const username = req.body['username']
//       const password = req.body['password']
//       //const passwordagain = req.body['passwordagain']
//       console.log(email);
//       console.log("its in");
//     }
// }