import shell from 'shelljs'

shell.exec('mongoimport --db marshallz --collection authors --drop --jsonArray --file ~/src/dev/marshallz/config/scripts/authors.json')
shell.exec('mongoimport --db marshallz --collection posts --drop --jsonArray --file ~/src/dev/marshallz/config/scripts/posts.json')
