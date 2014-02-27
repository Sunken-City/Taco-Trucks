#!/bin/bash

# Will Spurgin
# Made 2/25/2014

ROOT_UID=0     # Only users with $UID 0 have root privileges.
E_XCD=86       # Can't change directory
E_NOTROOT=87   # Non-root exit error.
EACCES=13      # Permission denied
name="server"

echo

# Check os, this will determine the default path to ssl
if [[ $OSTYPE == darwin* ]]; then
    DIR="/etc/apache2/ssl/localcerts"
elif [[ $OSTYPE == linux-gnu ]]; then
    DIR="/etc/ssl/localcerts"
else
    echo -e "You're OS is not supported by this script, you will have to manually
    move the certificate and key to the proper location for ssl"
    DIR="."
fi

#Check the option flags
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

# after processing flags, verify that the user knows what they're doing

echo -e "This script will create a private key named '$name.key'
and self-signed certificate named '$name.crt'. and move them into
'$DIR' [WARNING] If the directories do not exist, they WILL be made!"
read -p "Do you want to continue? [Y/n]" -n1 -s goOn

echo

if [[ $goOn != 'Y' ]]; then
    echo -e "Exiting now. No key or certificate will be created."
    exit 0
fi

if [[ ! -d "$DIR" ]]; then
    mkdir -p $DIR || {
        echo "Could not make directories $DIR
        Might need to run this script as root to have proper permissions. Try adding 'sudo'."
        exit $EACCES
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


# Kindly enlighten the user.
echo -e "\nYour certificate and key have been created and moved into $DIR
Note, that this script has created a self-signed certificate. MOST web browsers
will not accept this certificate as a 'trusted' certificate. The purpose of this
script is to create 'test' certificate to use in development.
In order to make this certificate trusted for local development,
look up the instructions for your specific machine (as they differ greatly).
Here's a good link for help:
http://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate\n"


exit 0