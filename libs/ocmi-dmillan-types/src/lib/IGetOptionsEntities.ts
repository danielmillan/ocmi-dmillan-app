export default interface IGetOptionsEntities<Unique, Where, OrderBy> {
  skip?: number;
  take?: number;
  cursor?: Unique;
  where?: Where;
  orderBy?: OrderBy;
}
