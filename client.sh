#!/bin/bash

case $1 in
	-c|--compress) 
		curl --request POST --url "http://localhost:3000/compress" \
			--header 'content-type: application/json' \
			--data '{"url": '$2'}' ;;
	-a|--addUser)
		curl --request POST --url "http://localhost:3000/addUser" \
			--header 'content-type: application/json' \
			--data '{'$2'}' ;;
	-g|--getUser)
		curl --request GET --url "http://localhost:3000/getUser?email="$2 \
			--header 'content-type: application/json' ;;
	*) >&2 echo The given option is not valid or avaliable ;;
esac
