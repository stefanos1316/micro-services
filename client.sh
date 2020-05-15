#!/bin/bash

if [ "$1" == "-h" -o "$1" == "--help" ]; then
	echo
	echo A simple client program to managa the server functions
	echo ======================================================
	echo
	echo To add user use -a or --addUser with the second command line argument as 
	echo '"name":"Istvan","surname":"Tarnok","email":"sgeorgiou@aueb.gr","password":"somethingHungarian"'
	echo
	echo To get user use -g or --getUser with the second command line argument as
	echo '"email":"stefanos1316@gmail.com"'
	echo
	echo To compress an image use -c or --compress and as a second command line argument
	echo pass the url from an online image
	echo "https://tinypng.com/images/panda-happy.png"
	echo
	exit
fi

case $1 in
	-c|--compress)
		imageName=`echo $2 | awk -F'/' '{print $NF}' | awk -F'.' '{print $1}'`
		curl --request POST --url "http://localhost:3000/compress" \
			--header 'content-type: application/json' \
			--data '{"url": '$2'}' \
		        --output $imageName;;
	-a|--addUser)
		curl --request POST --url "http://localhost:3000/addUser" \
			--header 'content-type: application/json' \
			--data '{'$2'}' ;;
	-g|--getUser)
		curl --request GET --url "http://localhost:3000/getUser?email="$2 \
			--header 'content-type: application/json' ;;
	*) >&2 echo The given option is not valid or avaliable ;;
esac
