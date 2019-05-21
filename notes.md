# Getting started with React/Redux

### Commands

* $: `npx create-react-app react-overwatch-gt`

* $: `npm install redux react-redux redux-thunk`

Open a terminal window and navigate to or create a directory for your site

Sign in to Google:

* $: `firebase login`
Initiate your project:

* $: `firebase init`
Add your static files to your deploy directory (the default is public)

Deploy your website:

* $: `firebase deploy`

### Snippets




*Some bad way to call methods within a list with a specific element*
```javascript
// jsc within render()
	    { 
			Object.keys(this.props.changes).map(key => (
				<button onClick={
					() => { 
						console.log('selectingHero: ', key); 
						this.setState((state, props) =>  
							({
								selectedHero: this.props.changes[key]
							}));
					}
				} key={key}>{key}</button>
			)) 
		}
```



