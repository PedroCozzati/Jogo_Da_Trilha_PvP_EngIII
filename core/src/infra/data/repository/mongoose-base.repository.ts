import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, FilterQuery, PipelineStage, SortOrder, Types, UpdateQuery } from "mongoose";
import { Span } from "nestjs-otel";
import { Logger } from "nestjs-pino";
import { BaseModel } from "../../../domain/models/base.model";

@Injectable()
export class MongooseBaseRepository<TDocument extends BaseModel> {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject('NOME_MODEL_MONGOOSE') private readonly nomeModel: string,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async findOne(filterQuery: FilterQuery<TDocument>, sortQuery: any = {}): Promise<TDocument> {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findOne(filterQuery, {}, { lean: true })
      .sort(sortQuery);

    if (document)
      return document;

    this._logger.warn('Document not found with filterQuery', filterQuery);
  }

  @Span()
  async findOneById(_id: Types.ObjectId): Promise<TDocument> {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findById(_id, {}, { lean: true });

    if (document)
      return document;

    this._logger.warn('Document not found with _id', _id);
  }

  @Span()
  async find(filterQuery: FilterQuery<TDocument>, sortQuery: any = {}, limit: number = 100): Promise<TDocument[]> {
    this._logger.log("executing mongoose base repository method")

    const documents = await this.connection
      .model<TDocument>(this.nomeModel)
      .find(filterQuery, {}, { lean: true })
      .sort(sortQuery)
      .limit(limit);

    return documents
  }

  @Span()
  async insertOne(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    this._logger.log("executing mongoose base repository method")

    const createdDocument = await this.connection
      .model<TDocument>(this.nomeModel)
      .create({
        ...document,
        _id: new Types.ObjectId(),
      });

    const savedDocument = await createdDocument.save()

    return savedDocument["_doc"];
  }

  @Span()
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
      });

    if (document)
      return document["_doc"];

    this._logger.warn(`Document not found with filterQuery:`, filterQuery);
  }

  @Span()
  async findOneByIdAndUpdate(
    _id: Types.ObjectId,
    update: UpdateQuery<TDocument>
  ) {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findByIdAndUpdate(_id, update, {
        lean: true,
        new: true,
      });

    if (document)
      return document["_doc"];

    this._logger.warn(`Document not found with _id:`, _id);
  }

  @Span()
  async findOneAndUpdateObject(
    filterQuery: FilterQuery<TDocument>,
    documentToUpdate: TDocument
  ) {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findOneAndUpdate(filterQuery, documentToUpdate, {
        lean: true,
        new: true,
      });

    if (document)
      this._logger.warn(`Document not found with filterQuery:`, filterQuery);

    return document["_doc"];
  }

  @Span()
  async findOneByIdAndUpdateObject(
    _id: Types.ObjectId,
    documentToUpdate: TDocument
  ) {
    this._logger.log("executing mongoose base repository method")

    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .findByIdAndUpdate(_id, documentToUpdate, {
        lean: true,
        new: true,
      });

    if (document)
      return document["_doc"];

    this._logger.warn(`Document not found with _id:`, _id);
  }

  @Span()
  async updateOne(document: TDocument): Promise<TDocument> {
    const updatedDocument = await this.connection
      .model<TDocument>(this.nomeModel)
      .findOneAndReplace({ _id: document._id }, document);

    return document;
  }

  @Span()
  async deleteOne(filterQuery: FilterQuery<TDocument>, document: TDocument): Promise<TDocument> {
    const updatedDocument = await this.connection
      .model<TDocument>(this.nomeModel)
      .deleteOne(filterQuery, document);

    return document;
  }

  @Span()
  async aggregate(pipeline: PipelineStage[]): Promise<any> {
    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .aggregate<any>(pipeline);

    if (document)
      return document;

    this._logger.warn("Document not found", { query: JSON.stringify(pipeline) });
  }

  @Span()
  async exists(filter: FilterQuery<TDocument>): Promise<Types.ObjectId> {
    const document = await this.connection
      .model<TDocument>(this.nomeModel)
      .exists(filter);

    return document?._id;
  }
}