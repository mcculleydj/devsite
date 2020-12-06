export const lines = [
  '',
  'class Daren extends Person {',
  '  // press alt+x at any time to exit',
  '  constructor(intro) {',
  '    super()',
  "    this.name = 'Daren McCulley'",
  '    this.intro = intro',
  '  }',
  '}',
  'let daren = new Daren(',
  "  'An object-oriented approach to getting to know someone.'",
  ')',
  'console.clear()',
]

export const methods = ['love()', 'eat()', 'code()']

export const sources = ['love.jpg', 'eat.jpg', 'code.jpg']

export const comments = [
  `/**
 * comment one line one
 * comment one line two
 * comment one line three
 */
  `,
  `/**
 * comment two line one
 * comment two line two
 * comment two line three
 */
  `,
  `/**
 * comment three line one
 * comment three line two
 * comment three line three
 */
  `,
]

export const skillProficiencies = [
  {
    text: 'Familiar',
    targetRadius: 25,
    finalY: 40,
  },
  {
    text: 'Comfortable',
    targetRadius: 35,
    finalY: 80,
  },
  {
    text: 'Proficient',
    targetRadius: 45,
    finalY: 124,
  },
]

export const skillCategories = [
  {
    group: 'web',
    display: 'web',
    hexOffset: {
      x: -90,
      y: -140,
    },
    radialOffset: {
      x: -110,
      y: -155,
    },
  },
  {
    group: 'language',
    display: 'languages',
    hexOffset: {
      x: -85,
      y: -120,
    },
    radialOffset: {
      x: -80,
      y: -120,
    },
  },
  {
    group: 'database',
    display: 'databases',
    hexOffset: {
      x: -85,
      y: -140,
    },
    radialOffset: {
      x: -90,
      y: -130,
    },
  },
  {
    group: 'agile',
    display: 'agile',
    hexOffset: {
      x: -90,
      y: -95,
    },
    radialOffset: {
      x: -90,
      y: -90,
    },
  },
  {
    group: 'ui',
    display: 'user interface',
    hexOffset: {
      x: -90,
      y: -110,
    },
    radialOffset: {
      x: -80,
      y: -110,
    },
  },
  {
    group: 'env',
    display: 'tools',
    hexOffset: {
      x: -60,
      y: -140,
    },
    radialOffset: {
      x: -130,
      y: -140,
    },
  },
  {
    group: 'ops',
    display: 'ops',
    hexOffset: {
      x: -60,
      y: -140,
    },
    radialOffset: {
      x: -90,
      y: -140,
    },
  },
]

export const skills = [
  {
    group: 'language',
    display: 'JavaScript',
    title: 'js',
    r: 45,
    path: 'skill-icons/js.png',
    years: '>5',
    description:
      'My first job after leaving the Navy was working on an Angular web app and Node API for L3. Next, I built an application from scratch for my startup using the MEAN stack (Mongo, Express, Angular, and Node), which even at the DB layer relies on syntax that is nearly identical to JS. Most recently, I was the frontend tech lead for a team of 8 engineers building applications in Vue. For better or worse, JavaScript has been the language at the center of my career. As the lingua franca of the web, whatever complaints people have with JS, it is a must for anyone labeling themselves full-stack. I feel fortunate to have years of experience with the subtle beast. Like most JS devs I have a love-hate relationship with it, but I see the language moving in a positive direction.',
  },
  {
    group: 'language',
    display: 'TypeScript',
    title: 'ts',
    r: 35,
    path: 'skill-icons/ts.png',
    years: '>2',
    description:
      "Starting out as an Angular 2+ developer I had to learn TS out of necessity. I had a CS professor that designed his own language called Applied Type System (ATS) that enforces a strict way of writing code to prevent common runtime errors. Working with ATS gave me an appreciation for the value of strict typing and compile-time failures. Aside from avoiding runtime bugs, TS adds tremendous value to modern IDEs like VS Code especially on larger teams when you are interfacing with code you didn't write. Unfortunately, Vue 2 and specifically Vuex (Flux pattern state management for Vue) was not built for easy compatibility with TS. When I left the startup and converted to Vue, I had to leave TS behind. Vue 3 is written in TS and I am happy to be picking it up again. My prediction is that TS and TSX will continue to rise in popularity as more JS developers experience the joy of having some rules and boundaries.",
  },
  {
    group: 'language',
    display: 'Python',
    title: 'python',
    r: 45,
    path: 'skill-icons/python.png',
    years: '>5',
    description:
      "Python was the language Boston University used to teach me Computer Science. I was fortunate that they switched from Java to Python pretty early in the curriculum. I still avoid Java if possible. Python is the language I reach for when I need to rapidly prototype or I need access to its vast set of libraries. I'll also turn to Python for any ML needs based on my experience with Pandas and Scikit-Learn for off-the-shelf ways to train models. In my previous job, I helped build and maintain our largest and most complex API written in Python using Falcon / Hug. Finally, I built an open-source collection platform using Selenium driven by Python.",
  },
  {
    group: 'language',
    display: 'Golang',
    title: 'go',
    r: 35,
    path: 'skill-icons/go.png',
    years: '>2',
    description:
      "My first introduction to Go in my graduate distributed systems course. 2 years later, at SOSi, we selected Go as our language of choice for large scale data processing and writing APIs and I've been working with it ever since. If I were building a new web application today I would choose Go for the API layer of my stack. Managing thread safe concurrency with concepts like channel and select is where Go really excels, but there are many reasons to love this language. Through continuing education and building projects in Go my goal is to arrive at the point where the only reason to use Python is because there isn't a corresponding library for Go that accomplishes my task.",
  },
  {
    group: 'database',
    display: 'PostgreSQL',
    title: 'postgres',
    r: 35,
    path: 'skill-icons/postgres.png',
    years: '>2',
    description:
      "I started my last job as a proponent of NoSQL's flexibility and left it with the attitude that it really depends on the data. I was introduced to Postgres in my graduate databases course and other than conducting a migration from MySQL to Mongo it has been the only flavor of SQL I've come into contact with. I am much more comfortable with SQL now than I was two years ago. I've been able to turn to internet for guidance when I need to do something more complex. I am very familiar with PgAdmin and I do not hesitate to use PSQL in my projects to store highly relational data.",
  },
  {
    group: 'database',
    display: 'MongoDB',
    title: 'mongo',
    r: 45,
    path: 'skill-icons/mongo.png',
    years: '>4',
    description:
      "My first introduction to Mongo was in my Urban Data Mechanics course at BU not long after 10gen became Mongo. Since that time Mongo's market share and core product have improved dramatically. Their recent addition of transactions for sharded clusters is a great example of what sets this DB apart. One of my first contributions to SOSi was migrating a single MySQL instance to a Mongo sharded cluster reducing storage costs by 75% and allowing us to scale. I've completed every available Mongo University course and I've managed a sharded cluster composed of 33 VMs storing hundreds of millions of records. Mongo remains my first choice for the persistence layer, but not if the data is better represented in a relational or graph database.",
  },
  {
    group: 'database',
    display: 'ArangoDB',
    title: 'arango',
    r: 25,
    path: 'skill-icons/arango.png',
    years: '<1',
    description:
      "I was introduced to Arango in the final 6 months of my time at SOSi where we used it to store graph data. Honestly, I wasn't very impressed with the query syntax or the current state of the product. That said, I became familiar with how data best represented by a graph can be stored and queried and the value of using a database. My short-term goal is to learn neo4j for handling nodes, edges, and paths. Combining neo4j with a visualization library like D3 for displaying networks brings data to life in a way that tables and charts never will.",
  },
  {
    group: 'database',
    display: 'Redis',
    title: 'redis',
    r: 45,
    path: 'skill-icons/redis.png',
    years: '>2',
    description:
      "I was introduced to Redis at L3 and it was a staple at SOSi. More than any other product I can think of, Redis is a shining example of the philosophy: do one thing and do it well. I turn to Redis whenever I need an in-memory caching layer, but I've also used it as a communication bus between disparate processes and as a concurrency management tool since it is both thread safe and fast.",
  },
  {
    group: 'database',
    display: 'Minio',
    title: 'minio',
    r: 25,
    path: 'skill-icons/minio.png',
    years: '>1',
    description:
      "I was introduced to MinIO at SOSi when we needed an S3 solution for data storage and transfer. Adopting MinIO taught me how to divide data that should be stored in a database versus data that should not allowing for shorter DB maintenance cycles. The frontend dev in me really appreciates MinIO's slick UI. For the API layer their SDKs for Go and Python make it easy to interface with the store. S3 isn't always necessary, but flat file storage in production should be a thing of the past in the face of solutions like MinIO. The ability to give non-developers instant access to the store via the web UI is reason enough to adopt MinIO when you need to share files with a team.",
  },
  {
    group: 'database',
    display: 'Solr',
    title: 'solr',
    r: 25,
    path: 'skill-icons/solr.png',
    years: '>2',
    description:
      "For open source full-text search your options are Solr or Elastic and both write indices in Lucene. We opted for the former and our use case was quite complex. I was not the primary engineer on the Solr cloud like I was for the Mongo cluster backing it, but I have enough experience with it now to effectively create and manage my own instance. At a MongoDB conference one of their engineers asked me why we didn't just use their full-text indexing. I replied, because I don't use a screwdriver to pound in a nail. More than a deep understanding of Solr, what I came away from this experience with is an appreciation for the complexity of maintaining fast full-text search on billions of records and why it is so important for your ability to scale to use the right tool for the job.",
  },
  {
    group: 'agile',
    display: 'GitLab',
    title: 'gitlab',
    r: 45,
    path: 'skill-icons/gitlab.png',
    years: '>2',
    description:
      "At SOSi, we used GitLab to manage version control, run Agile, perform code reviews, and perform CI / CD. I have a high opinion of this product and the changes I've seen them make over the 2 years I've been using it. I'm not particularly wedded to GitLab over one of their competitors, but I am wedded to idea that building professional software on a team requires something like GitLab to manage issues, releases, access, etc. Getting into the weeds with deploy tokens, dockerized runners for CI / CD, and integrations with external tools like Mattermost was a valuable experience.",
  },
  {
    group: 'agile',
    display: 'Trello',
    title: 'trello',
    r: 25,
    path: 'skill-icons/trello.png',
    years: '>1',
    description:
      "We used Trello at Zigg to manage a basic Kanban board. There were only three people on the team, but we were located across the country from each other. Trello was in its infancy at the time has since been purchased by Atlassian. It's been over two years since I've used it and I'm sure it's changed dramatically. Having co-founded Zigg after L3 which relied on the power of Atlassian's suite (Jira, BitBucket, Confluence, etc.) to coordinate thousands of engineers, product managers and designers, Trello was a welcome return to simplicity. If I needed an off-the-shelf Kanban board I'd certainly revisit Trello.",
  },
  {
    group: 'agile',
    display: 'Atlassian',
    title: 'atlassian',
    r: 25,
    path: 'skill-icons/atlassian.png',
    years: '<1',
    description:
      "I was exposed to the Atlassian suite while working at L3. More than an in-depth knowledge of Jira, what I came away from this experience with is the value in having your wiki talk to your issue board and having everything talking to Git. If I re-entered Atlassian's orbit I would certainly need to take a crash course in their applications, but I'm would not be starting from scratch.",
  },
  {
    group: 'ui',
    display: 'Vuetify',
    title: 'vuetify',
    r: 45,
    path: 'skill-icons/vuetify.png',
    years: '>2',
    description:
      "When I started working at SOSi the team had just started using Vue. They had picked BootstrapVue as their UI framework. I was partial to Material Design based on my experience with Angular Material at Zigg. One of my first major decisions was to convert the existing BootstrapVue code to Vuetify. Not for aesthetic reasons, but because Vuetify had more to offer at the time (e.g. a datepicker) and the community around it seemed more vibrant. That decision turned out to be a very good one as Vuetify has become the UI framework of choice for Vue. Since that decision, I've become a big Vuetify fan. I'm active on their Discord and I've made small open source contributions to their code. Ultimately, I do not think that deep knowledge of a particular UI framework is crucial, however understanding the code behind it and how to bend the framework to your needs is an important skill if you opt to use one.",
  },
  {
    group: 'ui',
    display: 'Material Design',
    title: 'material',
    r: 35,
    path: 'skill-icons/material.png',
    years: '>4',
    description:
      "I have been working with MD for over 4 years now. I appreciate the value of a standard set of principles from which to deviate and how having the design system in place frees up the developer to focus on implementation. Although most of MD has been abstracted through the use of libraries like Angular Material and Vuetify, I often refer to the Material spec when building any custom UI components. In all three of my software engineering jobs I've made the case for MD. One of my strongest arguments for adoption is that it is maintained by Google and will continue to evolve under the care of very good designers. Depending on the make up of your team and your budget that can be a very compelling reason to consider MD above the alternatives.",
  },
  {
    group: 'ui',
    display: 'Angular Material',
    title: 'angular-material',
    r: 25,
    path: 'skill-icons/angular-material.png',
    years: '>1',
    description:
      'As the sole engineer for Zigg I was given the freedom to choose the stack and I went with what I knew at the time which was MEAN (Mongo, Express, Angular, and Node). The fact that both Angular and Material were Google products made Angular Material a logical choice for a UI framework. This experience taught me the value of a UI framework when starting from green fields for rapidly prototyping an application.',
  },
  {
    group: 'ui',
    display: 'Bootstrap',
    title: 'bootstrap',
    r: 25,
    path: 'skill-icons/bootstrap.png',
    years: '<1',
    description:
      "In school and just about every online course I've ever taken the default UI framework has been Bootstrap. I am not an expert in Bootstrap, but I understand enough about UI libraries at this point to read the docs and pick the right component. I understand Bootstrap's grid system, which has been pretty universally adopted across most other frameworks. I was pleased to read that Bootstrap 5 will be dropping the jQuery reliance. Integrations with JS frameworks like React, Angular, and Vue should be a lot easier without jQuery in the mix.",
  },
  {
    group: 'env',
    display: 'Git',
    title: 'git',
    r: 45,
    path: 'skill-icons/git.png',
    years: '>5',
    description:
      "I consider myself proficient at this point because of the number of Git issues I've had to unwind in my 5 years of working with it. I understand the difference between rebasing and merging. I've used Git LFS to efficiently version control large files. I know how to read a branch diagram and use tools like Git blame. I've used cherry pick to move certain changes into the production branch while excluding others. However, I do not consider myself a Git ninja. On the rare occasion that I need to use one of the more obscure commands I do what 99% of developers do and research it online. My take is that modern IDEs reduce the need for a deep understanding of the Git CLI. I run nearly all of my version control though my IDEs and I believe I have a clearer picture of what I'm committing and pushing or how I'm resolving conflicts than command line users of Git simply because the terminal cannot provide the same quality side by side comparison of two versions of the code the way PyCharm or VS Code do.",
  },
  {
    group: 'env',
    display: 'Jest',
    title: 'jest',
    r: 35,
    path: 'skill-icons/jest.png',
    years: '>2',
    description:
      "I use Jest with Vue Test Utils to unit test my Vue components. Prior to that I was using Karma + Jasmine which was the standard for applications scaffolded using Angular CLI. I find that there is a lot of overlap between JS testing frameworks, having experimented with Mocha and Chai as well. My research a few years ago suggested that for testing Vue applications Jest and Vue Test Utils was the winning combination and I haven't looked back since I've been happy with the results.",
  },
  {
    group: 'env',
    display: 'GitHub',
    title: 'github',
    r: 35,
    path: 'skill-icons/github.png',
    years: '>5',
    description:
      "Like most other devs, GitHub is where my personal code lives. I've forked repositories, starred good code, and submitted issues about bad code. I've put forward PRs and I've  accepted PRs from other developers. I don't have any experience with the Enterprise features, but I imagine that they are not wildly different from what GitLab offers. I consider myself a casual GitHub user and have not had a reason to dive deeper.",
  },
  {
    group: 'env',
    display: 'VS Code',
    title: 'vs-code',
    r: 45,
    path: 'skill-icons/vscode.png',
    years: '>4',
    description:
      "I grew up using Macs in the 80s and 90s before the iMac, iPod, and iPhone changed the brand. This was the Apple that Microsoft had to bailout to keep them afloat. I've complained about Microsoft making inferior products my whole life and then VS Code and TypeScript really shut me up. I love this light weight IDE and its extensibility. The only language I use another IDE for is Python, namely PyCharm, and I have a feeling that's coming to an end soon as well in favor of VS Code's lighter more opt-in approach.",
  },
  {
    group: 'env',
    display: 'PyCharm',
    title: 'pycharm',
    r: 35,
    path: 'skill-icons/pycharm.png',
    years: '>4',
    description:
      "JetBrains puts out great products tailored to specific languages like Java or Python. The ability to select a particular interpreter, create a virtual env, and the level of code hinting keeps me coming back to PyCharm for Python development. VS Code's Python extensions are catching up, but the last few times I've tried to switch I found I was not yet satisfied. Despite using PyCharm for years I have scratched the surface of what PyCharm can do since use cases requiring the more advanced features have not come up in practice.",
  },
  {
    group: 'ops',
    display: 'Linux',
    title: 'linux',
    r: 35,
    path: 'skill-icons/linux.png',
    years: '>5',
    description:
      "Any application I've ever deployed has been to some flavor of Linux. I prefer Ubuntu, but I'm perfectly fine with Debian or CentOS. Over the years I've learned what I need to know to configure Linux machines as necessary to run certain services like Mongo, Docker, or Ansible. For example, mounting network drives, managing scheduled tasks, and keeping the system time from drifting are all familiar tasks for me. I am comfortable with all of the basics of the Linux command line in addition to more advanced features like rsync, tmux, and cron. I tend to solve small programming tasks in Python or Go rather than writing a shell scripts, because I'd rather write code in Python or Go.",
  },
  {
    group: 'ops',
    display: 'MacOS',
    title: 'macos',
    r: 45,
    path: 'skill-icons/macos.png',
    years: '>10',
    description:
      "My years in the Navy forced me to use Windows both at home and at work. A decade ago I bought a MacBook air and I have not purchased a personal machine that was not a Mac since. L3 used Windows, but at Zigg and SOSi I developed on MacOS exclusively. I feel qualified to directly compare the two experiences and while Windows 10 was a step in the right direction (especially with the addition of a bash terminal) I still find it to be a better experience to develop on a Mac. One of the main reasons for this is that in every case my production environment is Linux. Building and testing the code on Unix-based MacOS provides an easier bridge to the Linux environment. In my opinion there are fewer steps involved in getting something working on prod as it did in dev going from Mac to Linux, vice starting from Windows. Outside of .NET I can't think of a good reason to opt for developing on Windows rather than Linux or MacOS and every software conference or meetup I've ever attended seems to confirm this as a widely held belief.",
  },
  {
    group: 'ops',
    display: 'Docker',
    title: 'docker',
    r: 35,
    path: 'skill-icons/docker.png',
    years: '>2',
    description:
      'At SOSi, we used Docker and specifically docker-compose to quickly spin up dev environments in order to avoid the "works on my machine" problem and get new developers writing code on day one rather than setting up their environment. We took advantage of GitLab\'s container registry for each project allowing for Docker Hub like image versioning and the ability to add to extend an image without breaking any other project reliant on it. Aside from dev envs I\'ve used Docker and Go to spin up ephemeral services on demand as a do it yourself version of docker swarm or Kubernetes.',
  },
  {
    group: 'ops',
    display: 'XenServer',
    title: 'xen',
    r: 35,
    path: 'skill-icons/xen.png',
    years: '>2',
    description:
      'At SOSi, Xen was the hypervisor used to manage our virtualization layer and despite my title as the lead frontend engineer I was very involved in this process. We actively managed a cloud of 45+ VMs across multiple physical machines. I have experience combining Xen and Ansible to manage infrastructure-as-code as well as maintaining the cloud using both the Xen CLI and XenCenter. While I lack cloud provider experience (AWS, GCP, etc.), I have managed a cloud without the benefit of those abstractions for over 2 years.',
  },
  {
    group: 'ops',
    display: 'Ansible',
    title: 'ansible',
    r: 25,
    path: 'skill-icons/ansible.png',
    years: '>2',
    description:
      "I've used Ansible to pick up where the hypervisor leaves off for managing a cloud of VMs. Examples of playbooks I've written include set up tasks such as creating file system partitions, network configuration, and installing software as well as maintenance tasks such as upgrading software, load balancing, and system health monitoring.",
  },
  {
    group: 'web',
    display: 'HTML',
    title: 'html',
    r: 45,
    path: 'skill-icons/html.png',
    years: '>5',
    description:
      "The majority of my work with HTML has been in the context of producing templates for Angular and Vue. Some areas that I'd like to learn more about on are accessibility and SEO. For me HTML5 even with all the new features is nothing more than a way to get the bones of my application into the DOM. I find it better to rely on JS and CSS to provide a consistent experience across browsers rather than relying on each browser's interpretation of an advanced HTML5 feature.",
  },
  {
    group: 'web',
    display: 'CSS',
    title: 'css',
    r: 35,
    path: 'skill-icons/css.png',
    years: '>5',
    description:
      "I am not a CSS wizard, but I have years of experience using CSS to build SPAs using frameworks like Angular and Vue. This brand of CSS relies less on large style sheets and more on keeping styles scoped to their individual components. Thus far any complex use cases for CSS like flexbox, transitions, and variables have all been easy enough to research and implement. My goal is to specialize more on the frontend and that means a renewed focus on my proficiency with CSS. Specifically, there are two aspects of CSS I'd like to learn in the near future: a framework like Tailwind and a preprocessor like SASS.",
  },
  {
    group: 'ops',
    display: 'Node',
    title: 'node',
    r: 35,
    path: 'skill-icons/node.png',
    years: '>4',
    description:
      "Putting Node in the Ops category is not exactly where the JS runtime belongs, however these days I use it to run Vue CLI and the Webpack dev server. Outside of that I use Node to quickly prototype JS code outside of a framework or the browser. I'm comfortable with callbacks, the event loop, and Node's built in functions for interacting with the OS, but my preference is to use Python or Go to write code that others might write in Node because JS is the only language they know or they prefer to keep the entire stack in a single language.",
  },
  {
    group: 'web',
    display: 'Vue',
    title: 'vue',
    r: 45,
    path: 'skill-icons/vue.png',
    years: '>2',
    description:
      "I learned Vue out of necessity when I started working at SOSi. They made the decision to migrate a PHP application to Vue before I arrived or I may have strongly advocated for Angular. I knew Angular very well at that point and giving up TypeScript and a framework backed by Google to adopt a less mature framework controlled by a single individual made me nervous. However, that die had already been cast and I was hired in part to help bolster their JS and frontend capabilities. One of the major selling points of Vue is the excellent documentation and the shallow learning curve. Coming from Angular, I had the basics of Vue down within 2-3 days and was actively leading the migration effort within my first week on the job. Since making the transition I've developed several applications in Vue; joined Vue DC, a local meetup, where I've given three talks; attended a national Vue conference; completed courses on Udemy; and consumed every course on Vue Mastery. No framework is perfect and every application is different, but Vue has a vibrant and growing community and the core team is not afraid to innovate. I'm happy to call it home for now.",
  },
  {
    group: 'web',
    display: 'Angular',
    title: 'angular',
    r: 25,
    path: 'skill-icons/angular.png',
    years: '>2',
    description:
      "My first software job was as an Angular developer at L3. Prior to that job I had only used vanilla JS and few instances of jQuery during my time at Boston University. I had no clue what a JS framework was. Once I got the job I bought a subscription to Plural Sight (a curated video education site) and completed every Angular course I could find and learned about TS along the way out of necessity since Angular relies on TS's experimental features like decorators to make the magic happen. This was not long after the release of Angular 2 (now just Angular). The confusion between AngularJS (the original) and this new version, which was an entirely new framework and not backwards compatible, made research on the web very difficult. Despite the challenges, I was able to quickly learn my first modern JS framework and since that time I can no longer imagine building a web application without one. I really like Angular's batteries included approach. For example, Angular has it's own HTTP client based on RxJS, whereas most Vue projects add Axios as a dependency for this purpose. The freedom to choose your own external dependency is nice, but also risky since there is no guarantee that they will continue to play nice together as each independently evolves. I continued with and really mastered Angular during my time at the start up. The only reason I've given it a score of \"familiar\" is because my active use of Angular stopped when I transitioned to Vue and I know how much can change in two years.",
  },
  {
    group: 'web',
    display: 'Nginx',
    title: 'nginx',
    r: 25,
    path: 'skill-icons/nginx.png',
    years: '>2',
    description:
      "I learned to use Nginx at SOSi and it is still what I reach for to serve my Webpack production bundles. This website is brought to you in part by Nginx. The integration with Let's Encrypt and Certbot makes setting up TLS trivial. The config file documentation is very good and the power they give you to load balance, add security, and proxy pass all in one location is impressive. I have not had to use load balancing in practice, but I have used their security features to prevent DDoS or spidering and to set up proxy chains. I am by no means an expert in Nginx, but I have plans to become one.",
  },
  {
    group: 'env',
    display: 'Postman',
    title: 'postman',
    r: 35,
    path: 'skill-icons/postman.png',
    years: '>4',
    description:
      'Postman is the single best way I know of to test APIs during development. I first started using Postman in school and have been using it ever since. At SOSi we built a Golang API on top of Ansible and the Xen CLI to manage the virtual layer. For example, we could issue a handful of API requests to add three new MongoDB VMs, create a replica set using the new VMs, and then use that replica set to add a shard to our clustered DB for horizontal scaling. We always intended on building a frontend for this API, but one of the reasons that never happened was because Postman could handle all of our use cases including authentication and authorization.',
  },
  {
    group: 'web',
    display: 'D3',
    title: 'd3',
    r: 35,
    path: 'skill-icons/d3.png',
    years: '>2',
    description:
      "I was introduced to D3 in grad school when v3 was the current release. One of the difficulties of working with this visualization library is how many older examples will no longer work with later versions of D3. Being able to port those examples to the latest version is an important skill for getting the most out of existing code and one I've been developing. I have multiple continuing education goals for my time as a free agent, but D3 was the first. I recently completed Adam Janes' Mastering D3 course on Udemy and you can find examples of what I learned in the projects section this site. Data visualization is something I'm passionate about and I expect to be proficient in for the remainder of my career as a software engineer.",
  },
  {
    group: 'web',
    display: 'RxJS',
    title: 'rxjs',
    r: 35,
    path: 'skill-icons/rxjs.png',
    years: '>2',
    description:
      'Outside of Angular which directly relies on RxJS I have no professional experience with RxJS. My interest in the library is more personal than professional. It is the most elegant way to handle asynchrony and event streams in JS that I have come across. This visualization relies on RxJS to handle the addition of new skills at regular intervals. I gave a talk on RxJS and Vue which can be seen <a href="https://www.youtube.com/watch?v=sgSV681n18I&t=856s" target="_blank">here</a> and this is a library I plan keep in my tool belt for years to come.',
  },
  {
    group: 'web',
    display: 'Selenium',
    title: 'selenium',
    r: 35,
    path: 'skill-icons/selenium.png',
    years: '>2',
    description:
      'My experience with Selenium has been to perform JS enabled web scraping tasks. Selenium, Chromedriver, and the Python Selenium package is an extremely powerful combination. As more and more of the web relies on client side JS or AJAX to hydrate the page rather than a raw HTTP request open source collection will need tools like Selenium that allow for JS injection and waiting for DOM elements before capturing the HTML.',
  },
]
