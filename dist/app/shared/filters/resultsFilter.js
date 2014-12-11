/**
 * Iterate through the results, passing back only what is searched for
 * @return {object} Filtered results
 */
myHomeApp.filter('results', function(removeSpaceFilter) {
    return function(input, params) {
            // Store search properties on an array to loop through
            // [0] = searchCtrl, [1] = home.extras[0]
        var searchProps = [
                ['hasBalcony', 'balcony'],
                ['hasGarden', 'garden'],
                ['allowsPets', 'pets'],
                ['hasSauna', 'sauna']
            ],
            // Array to store keys to be removed
            toRemove = [],
            // Array to store filtered results
            filteredResults = [];

        // Filter by home type
        if (params.types.studio || params.types.apartment || params.types.rowhouse || params.types.house) {
            // Only filter if at least one is selected
            for (var i = 0; i < input.length; i++) {
                var thisHomeType = removeSpaceFilter(input[i].type);
                if (!params.types[thisHomeType]) {
                    toRemove.push(i);
                }
            }
        }

        // Remove results not in selected areas
        if (params.areas.length > 0) {
            // If at least one area is selected
            for (var i = 0; i < input.length; i++) {
                if (!_.contains(params.areas, input[i].area)) {
                    toRemove.push(i);
                }
            }
        }

        // Remove availability mismatches
        // Loop through results and place keys to remove on toRemove[]
        for (var i = 0; i < input.length; i++) {
            // Don't do anything if already in toRemove[]
            if (toRemove.indexOf(i) > -1) {
                continue;
            }
            if (((params.isAvailable === 'true' || params.isAvailable === true) && input[i].available === false) ||
                ((params.isAvailable === 'false' || params.isAvailable === false) && input[i].available === true)) {
                toRemove.push(i);
            }
        }

        // Remove price range mismatches
        for (var i = 0; i < input.length; i++) {
            // Don't do anything if already in toRemove[]
            if (toRemove.indexOf(i) > -1) {
                continue;
            }
            if (params.priceRange.min > input[i].rentalCost || params.priceRange.max < input[i].rentalCost) {
                toRemove.push(i);
            }
        }

        // Loop through searchProps[]
        for (var searchPropsIt = 0; searchPropsIt < searchProps.length; searchPropsIt++) {
            // Loop through results
            for (var resIt = 0; resIt < input.length; resIt++) {
                // Don't do anything if already in toRemove[]
                if (toRemove.indexOf(resIt) > -1) {
                    continue;
                }
                if (((params[searchProps[searchPropsIt][0]] === 'true' || params[searchProps[searchPropsIt][0]] === true) && input[resIt].extras[0][searchProps[searchPropsIt][1]] === false) ||
                    ((params[searchProps[searchPropsIt][0]] === 'false' || params[searchProps[searchPropsIt][0]] === false) && input[resIt].extras[0][searchProps[searchPropsIt][1]] === true)) {
                    toRemove.push(resIt);
                }
            }
        }

        // Loop through results adding to filteredResults[] only if not in toRemove[]
        for (var i = 0; i < input.length; i++) {
            if (toRemove.indexOf(i) === -1) {
                filteredResults.push(input[i]);
            }
        }
        return filteredResults;
    };
});