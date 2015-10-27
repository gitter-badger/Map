/** @namespace */
ott.namespace("ott.utils");


/**
 * @class 
 */
ott.utils.SolrUtils = {

    id:    'id',
    total: 'response.numFound',
    root:  'response.docs',

    // SOLR elements
    fields : [
            {name: 'name'}, 
            {name: 'address'},
            {name: 'city'},
            {name: 'url'},

            {name: 'lat'},  {name: 'lon'},
            {name: 'x'},    {name: 'y'},
            {name: 'bbox'}, {name: 'bbox_ospn'}, {name: 'bbox_wgs84'},
            
            {name: 'type'}, {name: 'type_name'}, {name: 'vtype'},

            {name: 'number', type: 'string'},  {name: 'pad_number'}, 
            {name: 'weekday'}, {name: 'saturday'}, {name: 'sunday'},
            {name: 'inbound_name'}, {name: 'outbound_name'},
            {name: 'frequent'},

            {name: 'id'},
            {name: 'zone_id'},
            {name: 'stop_id'},
            {name: 'landmark_id'},
            {name: 'amenities'},
            {name: 'street_direction'},
            {name: 'providers'},
            {name: 'ada_boundary'},
            {name: 'ott_boundary'},

            {name: 'spaces'},
            {name: 'routes'},
            {name: 'notes'},
            {name: 'use'}
    ],


    /** */
    solrDataToVectors : function(records, isMercator)
    {
        var retVal = [];
        for(var i = 0; i < records.length; i++)
        {
            var d = records[i].data;
            var x = d.x;
            var y = d.y;
            if(isMercator)
            {
                x = d.lon;
                y = d.lat;
            }

            var p = ott.utils.OpenLayersUtils.makePoint(x, y, isMercator);
            var v = new OpenLayers.Feature.Vector(p, d);
            d.feature = v;
            retVal.push(v);
        }
        return retVal;
    },

    /** get the elements from a SOLR record as an object (array) */
    solrRecordToObject : function(record)
    {
        var data = [];
        var el  = this.fields;
        for(var i in el)
        {
            var n = el[i].name;
            var r = record.get(n);
            if(n != null && r != null)
                data[n] = r;
        }

        return data;
    },

    CLASS_NAME: "ott.utils.SolrUtils"
};
