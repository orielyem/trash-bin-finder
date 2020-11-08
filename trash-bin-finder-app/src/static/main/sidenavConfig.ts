export const sidenavSettings = {
  htmlsettings: [
    {
      title: 'Search',
      icon: 'search',
      method:"GET",
      members: [
        'Search a trash bin emptying date by id',
        'Search trash bins by emptying date',
        'Search trash bins by distance from Location',
      ],
    },
    {
      title: 'Update',
      icon: 'update',
      method:"PUT",
      members: [
        'Update an emptying date of trash bin by id',
        'Update a location of trash bin by id',
      ],
    },
    {
      title: 'Delete',
      icon: 'delete',
      method:"DELETE",
      members: ['Delete a trash bin by id'],
    },
    {
      title: 'Add',
      icon: 'add',
      method:"POST",
      members: ['Add a new trash bin'],
    },
    {
      title: 'Download',
      icon: 'download',
      method:"GET",
      members: ['Download csv file by range of dates'],
    },
  ],
  functionBinding: {
    'Search a trash bin emptying date by id': {
      requestProp:{
        urlEnding: '/emptyingDateById',
        responseType: 'json'
      },
      params: [{ name: 'id', type: 'text', alias: 'id' }],
    },
    'Search trash bins by emptying date': {
      requestProp:{
        urlEnding: '/byEmptyingDate',
        responseType: 'json'
      },
      params: [{ name: 'emptying date', type: 'date', alias: 'emptyingDate' }],
    },
    'Search trash bins by distance from Location': {
      requestProp:{
        urlEnding: '/byDistanceFromPoint',
        responseType: 'json'
      },
      params: [
        { name: 'lat', type: 'double', alias: 'lat' },
        { name: 'lon', type: 'double', alias: 'lon' },
        { name: 'distance in meters', type: 'double', alias: 'distance' },
      ],
    },
    'Update an emptying date of trash bin by id': {
      requestProp:{
        urlEnding: '/emptyingDateById',
        responseType: 'json'
      },
      params: [
        { name: 'id', type: 'text', alias: 'id' },
        { name: 'emptying date', type: 'date', alias: 'emptyingDate' },
      ],
    },
    'Update a location of trash bin by id': {
      requestProp:{
        urlEnding: '/locationById',
        responseType: 'json'
      },
      params: [
        { name: 'id', type: 'text', alias: 'id' },
        { name: 'lat', type: 'double', alias: 'lat' },
        { name: 'lon', type: 'double', alias: 'lon' },
      ],
    },
    'Delete a trash bin by id': {
      requestProp:{
        urlEnding: '/',
        responseType: 'json'
      },
      params: [{ name: 'id', type: 'text', alias: 'id' }],
    },
    'Add a new trash bin': {
      requestProp:{
        urlEnding: '/',
        responseType: 'json'
      },
      params: [
        { name: 'id', type: 'text', alias: 'id' },
        { name: 'color', type: 'text', alias: 'color' },
        { name: 'type', type: 'text', alias: 'type' },
        { name: 'emptying date', type: 'date', alias: 'emptyingDate' },
        { name: 'lat', type: 'double', alias: 'lat' },
        { name: 'lon', type: 'double', alias: 'lon' },
      ],
    },
    'Download csv file by range of dates': {
      requestProp:{
        urlEnding: '/reportByEmptyingDateRange',
        responseType: 'text'
      },
      params: [
        { name: 'emptying date', type: 'date', alias: 'gteEmptyingDate' },
        { name: 'emptying date', type: 'date', alias: 'ltEmptyingDate' },
      ],
    },
  },
};
