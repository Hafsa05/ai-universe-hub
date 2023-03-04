// fetch data from API 
const fetchCardData = () => {
	loadSpinner(true);
	fetch('https://openapi.programming-hero.com/api/ai/tools')
		.then(res => res.json())
		.then(data => {
			const sliceCardItems = data.data.tools.slice(0, 6);
			displayCardData(sliceCardItems);
		})
}

// display main 6 card data 
const showDetails = document.getElementById('show-details');
const displayCardData = (tools) => {
	console.log(tools);

	tools.forEach(tool => {
		const cardsContainer = document.getElementById('cards-container');
		const cardDiv = document.createElement('div');
		cardDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
		cardDiv.innerHTML = `
			<figure class="p-2"><img src="${tool.image}" alt="Shoes"/></figure>
			<div class="card-body">
				<h2 class="card-title">Features</h2>
					${featureList(tool.features)}
				<hr>
				<div class="align-middle"> 
					<div>

						<div class="card-title">
							${(tool.name)}
						</div>

						<div>
							<i class="fa-regular fa-calendar-days"></i>
								${tool.published_in}
						</div>

					</div>
				
					<div class="text-2xl text-red-400 card-actions justify-end">
					<label for="my-modal-5"><i class="fa-solid fa-circle-arrow-right" onclick="fetchModalDetails('${tool.id}')"></i></label>
        			</div>

				</div>
			</div>
			`;

		cardsContainer.appendChild(cardDiv);
	});

	showDetails.classList.remove('hidden');
	loadSpinner(false);

}

// fetch data for see more button 
document.getElementById('btn-see-more').addEventListener('click', function () {
	loadSpinner(true);
	const cardList = document.getElementById('cards-container');
	cardList.innerHTML = '';
	fetch(`https://openapi.programming-hero.com/api/ai/tools`)
		.then(res => res.json())
		.then(data => displayCardData(data.data.tools))
	showDetails.classList.add('hidden');

})

// each card feature and integration items fetch & show
const featureList = (features) => {
	let featureHTML = '';
	for (let i = 0; i < features.length; i++) {
		featureHTML += `
			<ul>
				<li>${i + 1}. ${features[i]}</li>
			</ul>`;
	}
	return featureHTML;
}

// modal data fetching
const fetchModalDetails = (cardId) => {
	loadSpinner(true);
	const url = `https://openapi.programming-hero.com/api/ai/tool/${cardId}`;
	// console.log(url);
	fetch(url)
		.then(res => res.json())
		.then(data => showModalDetails(data.data))
}

// modal data showing
const showModalDetails = (dataDetails) => {
	console.log(dataDetails);
	const modalCard = document.getElementById('modal-card');
	modalCard.textContent = '';
	const modalDiv = document.createElement('div')
	modalDiv.classList.add('md:flex', 'gap-10')
	modalDiv.innerHTML = `
    <div class=" bg-red-50 border-solid border-2 border-red-300 p-10 rounded-lg">
        <h2 class="font-semibold">${dataDetails.description}</h2>
        <div class="grid grid-cols-3 gap-5 text-center">

            <div class = "bg-white">
                <h3 class="px-2 py-10 text-lime-500 font-semibold"><span>${dataDetails.pricing[0].price ? dataDetails.pricing[0].price : 'Free of Cost/'}</span><br><span>${dataDetails.pricing[0].plan}</span></h3>
             </div>

            <div class = "bg-white">
                <h3 class="px-2 py-10 text-yellow-600 font-semibold"><span>${dataDetails.pricing[1].price}</span><br><span>${dataDetails.pricing[1].plan}</span></h3>
            </div>

            <div class = "bg-white">
                <h3 class="px-2 py-10 text-red-600 font-semibold"><span>${dataDetails.pricing[2].price}</span><br><span>${dataDetails.pricing[2].plan}</span></h3>
            </div>

        </div>
    	<div class="mx-auto grid md:grid-cols-2">

        	<div>
            	<h3 class= "font-semibold text-2xl mb-4">Features</h3>
				<ol>
            		<li>1. ${dataDetails.features[1].feature_name}</li>
            		<li>2. ${dataDetails.features[2].feature_name}</li>
            		<li>3. ${dataDetails.features[3].feature_name}</li>
            	</ol>
        	</div>

        	<div>
         		<h3 class= "font-semibold text-2xl mb-4">Integrations</h3>
					${featureList(dataDetails.integrations)}
        	</div>

    	</div>
	</div>

	<div class=" p-2 border-solid border-2 border-slate-100 rounded-lg">
		<div >
			<img src="${dataDetails.image_link[0]}" class="rounded-lg">
			<button class="btn btn-error text-white absolute top-10 right-20">${dataDetails.accuracy.score * 100}% accuracy </button>
		</div>
	
    		<h3 class="p-5 font-semibold text-2xl text-center">"${dataDetails.input_output_examples[0].input}"</h3>
    		<p class="text-center" >"${dataDetails.input_output_examples[0].output}"</p>
	</div>

	<div class="modal-action">
    	<label for="my-modal-5" class="btn bg-red-400">X</label>
	</div>

    `;
	modalCard.appendChild(modalDiv);
	loadSpinner(false);
}

// modal feature data fetch & show dynamically 
const modalFeatureList = (modalFeatures) => {
	let modalFeatureArray = [];
	for (let i = 0; i < 3; i++) {
		modalFeatureArray = modalFeatures.map(fList => fList[i].feature_name);
	}

	let mFeatureHTML = '';
	for (let i = 0; i < modalFeatureArray.length; i++) {
		mFeatureHTML += `
 			<ul>
				<li>${i + 1}. ${modalFeatureArray[i]}</li>
 			</ul>
 			`;

	}
	return mFeatureHTML;
}

// spinner loading 
const loadSpinner = isLoading => {
	const loader = document.getElementById('spinner-id');
	if (isLoading) {
		loader.classList.remove('hidden');
	}
	else {
		loader.classList.add('hidden')
	}
}

// sort by date 
document.getElementById('btn-sort-date').addEventListener('click', function () {
	loadSpinner(true);
	const cardList = document.getElementById('cards-container');
	cardList.innerHTML = '';
	fetch(`https://openapi.programming-hero.com/api/ai/tools`)
		.then(res => res.json())
		.then(data => sortObjects(data.data.tools.published_in))

})
function sortByPublishingDate(objects) {
	objects.sort((a, b) => new Date(a.publishingDate) - new Date(b.publishingDate));
}

function sortObjects(objects) {
	sortByPublishingDate(objects);
	console.log(objects);
}

// ${featureList(dataDetails.integrations)}
// fetchCardData();