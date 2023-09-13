addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  const invalidRoute = "Invalid Route!";
  const invalidSpecies = "Invalid Parameter!"

  const repoLink = 'https://raw.githubusercontent.com/code2cube/PenguinImageAPI';

  const emperor = [`${repoLink}/main/img/emperor/`, 'emperor'];
  const chinstrap = [`${repoLink}/main/img/chinstrap/`, 'chinstrap'];
  const magellanic = [`${repoLink}/main/img/magellanic/`, 'magellanic'];
  const humboldt = [`${repoLink}/main/img/humboldt/`, 'humboldt'];
  const erect_crested = [`${repoLink}/main/img/erect_crested/`, 'erect-crested'];
  const royal = [`${repoLink}/main/img/royal/`, 'royal'];

  const allPenguinTypes = [
    emperor,
    chinstrap,
    magellanic,
    humboldt,
    erect_crested,
    royal,
  ];

  let statusCode = 404;

  if (pathname === '/') {
    const responseJSON = { error: invalidRoute };
    return new Response(JSON.stringify(responseJSON), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  else if (pathname === '/api') {
    let responseJSON = "";
    const getRawSpecies = searchParams.get("species") || false;
    if (getRawSpecies != false) {
      let getSpecies = [];
      for (let i=0; i < allPenguinTypes.length; i++) {
        const deez = ((allPenguinTypes[i])[1]);
        getSpecies.push(deez);
      }
      if(getSpecies.includes(getRawSpecies.toLowerCase())) {
        const penguin_type = getRawSpecies.toLowerCase();
        const index = Math.floor(Math.random() * 25);
        const link = `${repoLink}/main/img/${penguin_type}/${index}.jpg`;
        responseJSON = {
          img: link,
          species: penguin_type
        };
        statusCode = 201;
      } else {
        responseJSON = {error: invalidSpecies};
      }
    } else {
      statusCode = 201;
      const getRandomPenguinSpecies = Math.floor(Math.random() * allPenguinTypes.length);
      const randomPenguinSpecies = allPenguinTypes[getRandomPenguinSpecies];
      const index = Math.floor(Math.random() * 25);

      responseJSON = {
        img: `${randomPenguinSpecies[0]}${index}.jpg`,
        species: randomPenguinSpecies[1],
      };
    }

    const response = new Response(JSON.stringify(responseJSON), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      },
    });
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: response.headers });
    }
    return response;
  } else {
    const responseJSON = { error: invalidRoute };
    return new Response(JSON.stringify(responseJSON), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
