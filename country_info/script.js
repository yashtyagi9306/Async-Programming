const APIUrl = "https://restcountries.com/v3.1/name/{name}?fullText=true";

const searchBtn = document.querySelector(".search");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

// Function to fetch country data
async function getCountry(countryName) {
  try {
    const response = await fetch(APIUrl.replace("{name}", countryName));

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();
    displayCountry(data[0]);

  } catch (error) {
    result.classList.remove("hidden");
    result.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
  }
}

// Function to display country data
function displayCountry(country) {
  result.classList.remove("hidden");

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(curr => curr.name)
        .join(", ")
    : "N/A";

  result.innerHTML = `
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />

    <div class="country-info">
      <div class="info-item">
        <h3>Name</h3>
        <p>${country.name.common}</p>
      </div>

      <div class="info-item">
        <h3>Capital</h3>
        <p>${country.capital ? country.capital[0] : "N/A"}</p>
      </div>

      <div class="info-item">
        <h3>Region</h3>
        <p>${country.region}</p>
      </div>

      <div class="info-item">
        <h3>Population</h3>
        <p>${country.population.toLocaleString()}</p>
      </div>

      <div class="info-item">
        <h3>Languages</h3>
        <p>${languages}</p>
      </div>

      <div class="info-item">
        <h3>Currencies</h3>
        <p>${currencies}</p>
      </div>
    </div>
  `;
}

// Button click event
searchBtn.addEventListener("click", () => {
  const countryName = searchInput.value.trim();
  if (countryName !== "") {
    getCountry(countryName);
  }
});

// Press Enter to search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});