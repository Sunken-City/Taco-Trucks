#!/bin/bash

ROOT_UID=0     # Only users with $UID 0 have root privileges.
E_XCD=86       # Can't change directory
E_NOTROOT=87   # Non-root exit error.
name="server"

if [[ $OSTYPE == darwin* ]]; then
    DIR="/etc/apache2/ssl/localcerts"
elif [[ $OSTYPE == linux-gnu ]]; then
    DIR="/etc/ssl/localcerts"
else
    echo -e "You're OS is not supported by this script, you will have to manually
    move the certificate and key to the proper location for ssl"
fi


if [[ "$UID" -ne "$ROOT_UID" ]]; then
    echo -e "Must run this script as root. Try adding 'sudo'."
    exit $E_NOTROOT
fi

while getopts ":hn:d:" VALUE "$@" ; do

    if [[ "$VALUE" == "h" ]]; then
        echo -e "USAGE: $0 [-n name] [-d path]
            OPTIONS
            n   name option to specify the name of you private key and 
                self-signed certificate.

            d   a path option to specify the location in which the generated
                key and certificate will be place.

            h   help flag which will display this page.
        "
        exit 0
    fi

    if [[ "$VALUE" == "n" ]]; then
        name=$OPTARG
    fi

    if [[ "$VALUE" == "d" ]]; then
        DIR=$OPTARG
    fi

    if [[ "$VALUE" == ":" ]]; then
        echo "Flag -$OPTARG requires an argument."
        echo -e "USAGE: $0 [-n name] [-d path]
            OPTIONS
            n   name option to specify the name of you private key and 
                self-signed certificate.

            d   a path option to specify the location in which the generated
                key and certificate will be place.

            h   help flag which will display this page.
        "
        exit 1
    fi

    if [[ "$VALUE" == "?" ]]; then
        echo "Unknown Flag -$OPTARG detected."
        echo -e "USAGE: $0 [-n name] [-d path]
            OPTIONS
            n   name option to specify the name of you private key and 
                self-signed certificate.

            d   a path option to specify the location in which the generated
                key and certificate will be place.

            h   help flag which will display this page.
        "
        exit 1
    fi
done

echo -e "This script will create a private key named '$name.key'
and self-signed certificate named '$name.crt'. and move them into
'$DIR' [WARNING] If the directories do not exist, they WILL be made!"
read -p "Do you want to continue? [Y/n]" -n1 -s goOn

echo \n

if [[ $goOn != 'Y' ]]; then
    echo -e "Exiting now. No key or certificate will be created."
    exit 0
fi

if [[ ! -d "$DIR" ]]; then
    mkdir -p $DIR || {
        echo "Could not make directories $DIR"
        exit 1
    }
fi

cd $DIR || {
    echo "Could not change working directory to $DIR"
    exit $E_XCD
}

openssl req -new -x509 -days 365 -nodes -out $name.crt -keyout $name.key || {
    echo -e "Could not generate private key and cert. Is 'openssl' installed?
    Check with 'which openssl'. If no path to 'openssl' is returned, then you
    need to install 'openssl'."
    exit 1
}

cp $name.key $name.key.orig

openssl rsa -in $name.key.orig -out $name.key

exit 0