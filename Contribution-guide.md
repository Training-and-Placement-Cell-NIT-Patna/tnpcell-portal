Welcome contributors, this is the official site of the Training-Placement-Cell.
Below is the setup-guide for this project.


## Backend-setup

1. Navigate to : *backend/config/database.js*
		and apply these changes

2. Navigate to : *backend/config/server.js*
		and apply these changes

3. To run backend:
	```
	cd backend
	docker compose up -d
	npm run dev || bun dev
	```

## Frontend-setup

1. Navigate to: *frontend/config/index.js*
		and apply these changes

2. To run frontend:
   ```
   cd frontend
   npm run dev || bun dev
   ```

## Strapi-setup

1. Firstly, you have to signup to the strapi,

2. Navigate to: *Settings/Roles*: it should look like this,

3. Now for [roles and permissions configuration](https://docs.google.com/document/d/1D64h39SjRC3-Fcw2RU-U49l82BDDOIVuUudIiUJ9YNk/edit?usp=sharing):

4. Content Manager: 
	photo:

5. Create some users of different profile (like coordinator, student etc.)  under "user" relation.


## "document" is not defined (Error)

- This error may come to you for after running the frontend this is basically due to SSR.
- To handle this you should apply the dynamic imports in files containing "Lottie" (About.js , Loading.js and WhyUs.js) under *frontend/components/LandingPageElements*

```
import dynamic from "next/dynamic";

const Lottie = dynamic(()=>import("lottie-react"),{ssr:false})
```

- **Never commit these changes this is only to remove the development error, it is not an error at the production**
- ****

## Do's and Don'ts
- Always remove the console.logs which you have created while developing any feature or fixing bugs.
- Make sure you don't expose or hardcode the Backend URL in any of your function.
- Never commit the setup works which you have done inorder to run the project locally.
- Make a new branch for every new bug fixing or feature.
- Your local master || main branch should always be updated with the remote's main branch
- Never make a pull request in the master branch, use test branch for it.
- Pull request must have a detailed description about its intent you can find a template at **pull_request_template.md**.
- The commits' messages and pull requests titles must be clear about the purpose they serve.
- Watch the official repository so you will be informed about every actions there.

