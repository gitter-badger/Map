import os

###
### file combine routines below...
###

def filter(name, filters, filter_match, rev=False):
    ''' used to filter certain files from the 'combine' method below
    '''
    ret_val = False
    if len(filters) > 0:
        match = not filter_match
        for f in filters:
            if f in name or (rev and name in f):
                match = filter_match
                print "{}: {} does match filter {}".format("pass" if filter_match else "filtering", name, f)
                break
        if not match:
            ret_val = True
    return ret_val

def combine(dir, fname='ott.all', ext='js', filters=[], filter_match=True, filter_dirs=False, out_status='w'):
    ''' used to build a single file that includes other .js and .css files
    '''
    out_name = fname + '.' + ext
    out_file = open(dir + out_name, out_status)
    print "*** {} ***".format(out_name)

    for root, directories, filenames in os.walk(dir):
        if filter_dirs:
            if filter(root, filters, filter_match, True):
                continue

        for filename in filenames:
            if filename.endswith(ext) and out_name != filename:
                #import pdb; pdb.set_trace()

                # step 1: filter files
                if filter(filename, filters, filter_match):
                    continue

                # step 2: we pass the filter, then append the file
                print filename
                f = os.path.join(root, filename)
                fh = open(f)
                data = fh.read() + '\n'
                fh.close()
                out_file.write(data)

    out_file.close()


#import pdb; pdb.set_trace()
combine(dir='ott/map/static/css/', ext='css')
combine(dir='ott/map/static/js/',  ext='js', fname='ott.leaflet',    filters=['openlayers', 'config'],  filter_match=False, filter_dirs=True)
combine(dir='ott/map/static/js/',  ext='js', fname='ott.openlayers', filters=['leaflet', 'config'],     filter_match=False, filter_dirs=True)
combine(dir='ott/map/static/resources/leaflet/', ext='js',  fname='ott.leaflet', filters=['leaflet-src'], filter_match=False, filter_dirs=True)
combine(dir='ott/map/static/resources/leaflet/', ext='css', fname='ott.leaflet', filters=['leaflet-src'], filter_match=False, filter_dirs=True)
