const resolvers = {
  Query: {
    loads: async (_, {}) => {
      try {
        console.log('efijosfioesj')
        const testLoat = {
          hash: 'String',
          company:'String',
          contact:'String',
          origin: 'String',
          destination: 'String',
          travelTime: 22,
          hotSpot: 'String',
          distanceFromHotSpot: 'String',
          age:'String',
          notes:'String',
        }
        return [testLoat];
      } catch (error) {
        console.log(error);
      }
    }
  },
};

module.exports = resolvers;
