const fetchBtn = document.getElementById("fetchUsers");
const iconPaths = {
  email: "svgs/email.svg",
  registration: "svgs/registration.svg",
  compass: "svgs/compass.svg"
}

fetchBtn.addEventListener("click", () => fetchUsers());

const fetchUsers = async () => {
  const fkuAmount = parseInt(document.getElementById("fkuAmount").value) ?? 1;
  const res = await fetch(`https://randomuser.me/api/?results=${fkuAmount}`);
  const { results } = await res.json();

  results.forEach((e) => {
    const fakeUserContainer = document.getElementById("fakeUser-wrapper");
    const { title, first, last } = e.name,
      { city, country } = e.location,
      { email } = e,
      { latitude, longitude } = e.location.coordinates,
      { date } = e.registered,
      { large } = e.picture;

      let div = document.createElement('div');
      div.id = 'user-profile';
      div.className = 'z-10 inline-block w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 mx-auto';
      div.innerHTML = `
          <div class="p-3">
              <div class="flex items-center mb-2">
                  <img class="w-10 h-10 rounded-full" src="${large}" alt="Avatar">
                  <div class="flex flex-col ml-2 h-auto">
                      <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                          ${title} ${first} ${last}
                      </p>
                      <p class="text-xs font-normal flex">
                          ${city}, ${country}
                      </p>
                  </div>
              </div>
              <p class="mb-1 text-sm flex">
                  <img src="${iconPaths.email}" alt="Email:" class="mr-1">
                  ${email}
              </p>
              <p class="mb-4 text-sm flex">
                  <img src="${iconPaths.compass}" alt="GeoLoc:" class="mr-1">
                  ${latitude}, ${longitude}
              </p>
              <ul class="flex text-sm">
                  <li class="me-2 flex">
                      <img src="${iconPaths.registration}" alt="regDate:" class="mr-1">
                      <span>Joined at <b>${formatAMPM(new Date(date))}</b></span>
                  </li>
              </ul>
          </div>
      `;
      
      fakeUserContainer.appendChild(div);
  });
};

const formatAMPM = (date) => {
  date = new Date(date);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}