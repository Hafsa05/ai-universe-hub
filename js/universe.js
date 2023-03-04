const fetchCardData = () => {
	loadSpinner(true);
	fetch('https://openapi.programming-hero.com/api/ai/tools')
		.then(res => res.json())
		.then(data => displayCardData(data.data.tools))
}

// display card data function
const displayCardData = (tools) => {
	console.log(tools);
	// for (const tool of tools) {
	// 	console.log(tool)
	// }
	const cardsContainer = document.getElementById('cards-container');

	//  see more button visibility
	const showAll = document.getElementById('btn-see-more');
	if (tools.length > 6) {
		tools = tools.slice(0, 6);

	}
	else {
		showAll.classList.add('hidden');
	}



	// sort by date
	document.getElementById('btn-sort-date').addEventListener('click', function (objects) {
		// sortByPublishingDateAscending(e);
		sortObjects(objects);
	})

	function sortByPublishingDateAscending(objects) {
		objects.sort((a, b) => new Date(a.publishingDate) - new Date(b.publishingDate));
	}
	function sortObjects(objects) {
		sortByPublishingDateAscending(objects);
		console.log(objects);
	}






	// tools = tools.slice(0,6);
	tools.forEach(tool => {
		const cardDiv = document.createElement('div');
		cardDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
		cardDiv.innerHTML = `
			<figure class="p-2"><img src="${tool.image}" alt="Shoes" /></figure>
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
	loadSpinner(false);

}










// each card feature showing
const featureList = (features) => {
	let featureHTML = '';
	// if(features.length === 0){
	// 	featureHTML = 'No data found';
	// }
	// else{
	for (let i = 0; i < features.length; i++) {
		featureHTML += `
			<ul>
				<li>${i + 1}. ${features[i]}</li>
			</ul>`;
	}
	// }

	return featureHTML;
}

// modal 
const fetchModalDetails = (cardId) => {
	loadSpinner(true);
	const url = `https://openapi.programming-hero.com/api/ai/tool/${cardId}`;
	// console.log(url);
	fetch(url)
		.then(res => res.json())
		.then(data => showModalDetails(data.data))
}

const showModalDetails = (dataAll) => {
	console.log(dataAll);
	const modalCard = document.getElementById('modal-card');
	modalCard.textContent = '';
	const modalDiv = document.createElement('div')
	modalDiv.classList.add('flex', 'gap-10')
	modalDiv.innerHTML = `
    <div class="border-solid border-2 border-sky-500 p-10 rounded-lg">
        <h2 class="font-semibold">${dataAll.description}</h2>
        <div class="grid grid-cols-3 gap-5 text-center">
            <div>
                <h3 class="px-2 py-10 text-green-500 font-semibold"><span>${dataAll.pricing[0].price ? dataAll.pricing[0].price : 'Free of Cost/'}</span><br><span>${dataAll.pricing[0].plan}</span></h3>
             </div>
            <div>
                <h3 class="px-2 py-10 text-yellow-500 font-semibold"><span>${dataAll.pricing[1].price}</span><br><span>${dataAll.pricing[1].plan}</span></h3>
            </div>
            <div>
                <h3 class="px-2 py-10 text-red-500 font-semibold"><span>${dataAll.pricing[2].price}</span><br><span>${dataAll.pricing[2].plan}</span></h3>
            </div>
        </div>
    	<div class="flex gap-20">
        	<div>
            	<h3 class= "font-semibold text-2xl mb-4">Features</h3>
				<ul>
            		<li>${dataAll.features[1].feature_name}</li>
            		<li>${dataAll.features[2].feature_name}</li>
            		<li>${dataAll.features[3].feature_name}</li>
            	</ul>
			
			
        	</div>
        	<div>
         		<h3 class= "font-semibold text-2xl mb-4">Integrations</h3>
					${featureList(dataAll.integrations)} 
					
		 
        	</div>
    	</div>
	</div>
	<div class=" p-2 border-solid border-2 border-slate-300 rounded-lg">
		<div>
			<img src="${dataAll.image_link[0]}">
			<button class="btn btn-error text-white absolute top-10 right-20">${dataAll.accuracy.score * 100}% accuracy </button>
		</div>
	
    		<h3 class="font-semibold text-2xl">"${dataAll.input_output_examples[0].input}"</h3>
    		<p>"${dataAll.input_output_examples[0].output}"</p>
	</div>
	<div class="modal-action">
    	<label for="my-modal-5" class="btn bg-red-400">X</label>
	</div>
    `;
	modalCard.appendChild(modalDiv);
	loadSpinner(false);
}

// ${featureList(dataAll.integrations)}

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



// see more btn 
document.getElementById('btn-see-more').addEventListener('click', function (tools) {
	const cardsContainer = document.getElementById('cards-container');
	// tools = tools.slice(0,6);
	tools.forEach(tool => {
		const cardDiv = document.createElement('div');
		cardDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
		cardDiv.innerHTML = `
			<figure class="p-2"><img src="${tool.image}" alt="Shoes" /></figure>
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
				
					<div class=" text-red-400 card-actions justify-end">
						<i class="fa-solid fa-arrow-right"></i>
        			</div>

				</div>
			</div>
			`;
		cardsContainer.appendChild(cardDiv);
	});
})
const loadSpinner = isLoading => {
	const loader = document.getElementById('spinner-id');
	if (isLoading) {
		loader.classList.remove('hidden');
	}
	else {
		loader.classList.add('hidden')
	}
}

// fetchCardData();