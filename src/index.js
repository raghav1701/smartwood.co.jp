import puppeteer from 'puppeteer'
// import { username, password } from './secrets.js'
import { scrollPageToBottom } from 'puppeteer-autoscroll-down'

const randomIntFromInterval = (min, max) => { // min inclusive and max exclusive
	return Math.floor(Math.random() * (max - min) + min);
}

let sleep_for = async (page, min, max) => {
	let sleep_duration = randomIntFromInterval(min, max);
	// console.log('waiting for ', sleep_duration / 1000, 'seconds');
	await page.waitForTimeout(sleep_duration); // simulate some quasi human behaviour
}

// let getTweets = async (page) => {

// 	await page.goto(URL, { waitUntil: 'networkidle2' });
// 	await sleep_for(page, 1000, 2000);





// 	// $x(`//div[@aria-label="Timeline: Raghav Agrawal’s Tweets"]/div/div[1]/div/div/article/div/div/div[2]/div[2]/div`)


// }


// let authenticate = async (page) => {
// 	try {
// 		const un_inputs = await page.$x(`//input`)
// 		if (un_inputs.length > 0) {
// 			await un_inputs[0].focus()
// 			await page.keyboard.type(username)
// 			// await page.screenshot({path: 'screenshot-002-after-username.png'})
// 		}
// 		// const pw_inputs = await page.$x(`//input[@name="session[password]"]`)
// 		// if (pw_inputs.length > 0) {
// 		// 	await pw_inputs[0].focus()
// 		// 	await page.keyboard.type(password)
// 		// 	// await page.screenshot({path: 'screenshot-003-after-password.png'})
// 		// }
// 		const login_buttons = await page.$x(`//div[@role='button']`)
// 		if (login_buttons.length > 0) {
// 			await login_buttons[2].click()
// 			// await page.click("button[type=submit]")
// 			// await page.waitForNavigation({ waitUntil: 'networkidle0' })
// 			// await page.screenshot({path: 'screenshot-004-after-click-login.png'})
// 		}
// 	} catch (e) {
// 		console.log("Errrror in authenticate: ", e)
// 	}
// }

// let authenticate2 = async (page) => {
// 	try {
// 		const un_inputs = await page.$x(`//input`)
// 		if (un_inputs.length > 0) {
// 			await un_inputs[1].focus()
// 			await page.keyboard.type(password)
// 			// await page.screenshot({path: 'screenshot-002-after-username.png'})
// 		}
// 		// const pw_inputs = await page.$x(`//input[@name="session[password]"]`)
// 		// if (pw_inputs.length > 0) {
// 		// 	await pw_inputs[0].focus()
// 		// 	await page.keyboard.type(password)
// 		// 	// await page.screenshot({path: 'screenshot-003-after-password.png'})
// 		// }
// 		const login_buttons = await page.$x(`//div[@role='button']`)
// 		if (login_buttons.length > 0) {
// 			await login_buttons[2].click()
// 			// await page.click("button[type=submit]")
// 			// await page.waitForNavigation({ waitUntil: 'networkidle0' })
// 			// await page.screenshot({path: 'screenshot-004-after-click-login.png'})
// 		}
// 	} catch (e) {
// 		console.log("Errrror in authenticate: ", e)
// 	}
// }

let navigateToPage = async (result,page, URL) => {
	var ans = "";
	await page.goto(URL, { waitUntil: 'networkidle2' });
	await page.evaluate(() => document.body.style.zoom = 0.5);
	// await sleep_for(page, 2000, 3000);
	
	var user_name = ""
	const user = await page.$x(`//div[@data-testid="UserName"]/div[1]/div/div[1]`)
	if (user.length > 0) {
		for (let i = 0; i < user.length; i++) {
			user_name = await page.evaluate(element => element.innerText, user[i])
		}
	}
   
	// console.log(user_name);
	
	var i = 1
	

	// O -> $x(`//div[@aria-label="Timeline: Raghav Agrawal’s Tweets"]/div/div[1]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div`)

	while (true) {

		const names = await page.$x(`//div[@aria-label="Timeline: ${user_name}’s Tweets"]/div/div[${i}]/div/div/article/div/div/div[2]/div[2]/div`) 

		// const names = await page.$x(`//div[@aria-label="Timeline: Liked by"]/div/div/div/div/div/div[2]/div[1]/div[1]`)
		// let lines = [];
		if (names.length > 0) {

			// console.log(names.length)

			const title = await page.$x(`//div[@aria-label="Timeline: ${user_name}’s Tweets"]/div/div[${i}]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div`)

			for (let i = 0; i < title.length; i++) {
				let name = await page.evaluate(element => element.innerText, names[i])
				// 	name = name.replace(/(\r\n|\n|\r)/gm, " "); // remove new lines
				// console.log(name);
				ans = ans + "s"
				// 	lines.push(name);
			}

			i = i + 1
			if (i == 1 || i == 2) {
				await scrollPageToBottom(page, { size: 50, stepsLimit: 8 })
			}
			await scrollPageToBottom(page, { size: 20, stepsLimit: 8 })
			await sleep_for(page, 500, 1000);
		}
		if(i>12){
			return ans
		}
		else {
			i = i + 1
			// console.log("Skipped")
			ans = ans + "e"
			await scrollPageToBottom(page, { size: 50, stepsLimit: 3 })
			await sleep_for(page, 500, 1000);
			continue
		}
		// return lines;
	}
}

// function shuffle(array) {
// 	var currentIndex = array.length, randomIndex;

// 	// While there remain elements to shuffle...
// 	while (0 !== currentIndex) {

// 		// Pick a remaining element...
// 		randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex--;

// 		// And swap it with the current element.
// 		[array[currentIndex], array[randomIndex]] = [
// 			array[randomIndex], array[currentIndex]];
// 	}

// 	return array;
// }

let main_actual = async () => {
	try {
		// const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized', '--window-size=1920,1040'] });        
		const browser = await puppeteer.launch({
			headless: false,
			env: {
        ...,
        DISPLAY: ":10.0"
    }
		})
		const page = await browser.newPage()
		// const URL = 'https://twitter.com/login'
		await page.setViewport({
			width: 1280,
			height: 800,
			// width:0, height:0,
			deviceScaleFactor: 1,
		});
		// await page.goto(URL, { waitUntil: 'networkidle2' })
		// await sleep_for(page, 1000, 2000)
		// await authenticate(page)
		// await sleep_for(page, 1000, 2000)
		// await authenticate2(page)
		// await sleep_for(page, 3000, 4000)

		var myStringArray = ["arsh_goyal", "tanyarajhans7","Araghav_", "elonmusk", "Cristiano","SpaceX","Tesla","Google","YouTube","selenagomez","rihanna","shakira","PaulinaRubio","belindapop","dannapaola"];
		var arrayLength = myStringArray.length;
		var result = ""
		for (var i = 0; i < arrayLength; i++) {
			let names = await navigateToPage(result,page, "https://twitter.com/" + myStringArray[i])
			console.log(names)
			result = result + names + " "
			await sleep_for(page, 300, 600)
		}
		console.log(result)

		
		// await getTweets(page)
		// let winners1 = names.filter(name => name.includes('Follows you'));
		// // console.table(winners1);
		// let winners2 = shuffle(winners1).slice(0, 3);
		// console.log("\n\n******** Winners are\n\n");
		// console.table(winners2);
	} catch (e) {
		console.log(e)
	}
}


let main = async () => {
	await main_actual()
}

main()
