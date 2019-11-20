const deepAssign = require('deep-assign');
const { getAsArray } = require('@base-cms/object-path');
const GraphQLJSON = require('graphql-type-json');
const projection = require('../utils/adunit-projection');
const { DateType, ObjectIDType } = require('../types');

const { isArray } = Array;

const formatSize = (size) => {
  if (!size) return null;
  const s = `${size}`.trim().toLowerCase();
  if (!s) return null;
  if (/^\d+x\d+$/.test(s)) return s;
  return null;
};

module.exports = deepAssign(
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    ObjectID: ObjectIDType,
    JSON: GraphQLJSON,

    /**
     * Adunit Type
     */
    Adunit: {
      id: ({ _id }) => _id,
      key: ({ machinename }) => machinename,
      name: ({ slot }) => slot.replace(/\[.*?\]\s/g, ''),
      fluid: ({ size }) => size && `${size}`.toLowerCase() === 'fluid',
      size: ({ size }) => {
        if (!size) return [];
        if (size && `${size}`.toLowerCase() === 'fluid') return [];
        const sizes = (isArray(size) ? size.join('x') : size).split(',');
        return sizes.map(formatSize).filter(s => s);
      },
      oop: ({ settings }) => Boolean(settings.out_of_page),

      /**
       * @todo replace [token:key] values and make safe for GAM (strip special chars).
       */
      targeting: ({ settings }) => getAsArray(settings, 'targeting')
        .filter(v => v && typeof v === 'object' && v.target && v.value)
        .reduce((o, { target, value }) => ({ ...o, [target]: value.trim() }), {}),
    },

    AdunitSize: {
      width: (size) => {
        const [width] = size.split('x');
        return width;
      },
      height: (size) => {
        const [, height] = size.split('x');
        return height;
      },
    },

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',

      /**
       *
       */
      adunits: async (_, { input }, { adunits }) => {
        const { location, position, target } = input;
        const query = {
          'settings.location': location,
          'settings.position': position,
          ...(target && { 'settings.targeting.target': 'pos', 'settings.targeting.value': target }),
        };
        return adunits.find(query, { projection }).toArray();
      },
    },

    /**
     * Root mutations.
     */
    Mutation: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
