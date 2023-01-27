#!/usr/bin/env bash
set -uo pipefail

INPUT="_loader.js"
# NOW=$(date +"%Y%m%d")
NOW=$(date +"%s")

while read LINE <&3
do
	# Only do this on @import lines
	if [[ ${LINE:0:1} == "'" ]] || [[ ${LINE:0:1} == '"' ]]
	then
		# Skip '
		part1=${LINE##\'}
		# Skip "
		part1=${part1##\"}
		# Skip the end
		part2="${part1%%.js*}.js"

		cat $part2 >> vanille-$NOW.js
		echo $part2 >> vanille-build-$NOW.txt
	fi

done 3< "$INPUT"

if [[ -f "vanille-$NOW.js" ]]
then
	if dpkg -l minify;
	then
		minify vanille-$NOW.js > vanille-$NOW.min.js
	else
		# This command removes comments from CSS and Javascript files using sed.
		# Courtesy of https://github.com/CMDann/CSSJSMinify
		cat vanille-$NOW.js | sed -e "s|/\*\(\\\\\)\?\*/|/~\1~/|g" -e "s|/\*[^*]*\*\+\([^/][^*]*\*\+\)*/||g" -e "s|\([^:/]\)//.*$|\1|" -e "s|^//.*$||" | tr '\n' ' ' | sed -e "s|/\*[^*]*\*\+\([^/][^*]*\*\+\)*/||g" -e "s|/\~\(\\\\\)\?\~/|/*\1*/|g" -e "s|\s\+| |g" -e "s| \([{;:,]\)|\1|g" -e "s|\([{;:,]\) |\1|g" > vanille-$NOW.min.js
	fi
fi

exit 0
