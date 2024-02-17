export default interface IGetOptionsEntities<Unique, Where, OrderBy, Select> {
  skip?: number;
  take?: number;
  cursor?: Unique;
  where?: Where;
  orderBy?: OrderBy;
  select?: Select;
}
