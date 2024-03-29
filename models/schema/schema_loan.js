/**
 * Created by ������ on 2015-11-06.
 */
var mongoose = require('mongoose');

exports.foreignLangSchema = mongoose.Schema({
  exam: String, // TOEIC, TOEFL, ...
  score: Number, // 800, 900, ...
  validation: Date // 2017-09-23, ...
});

exports.licenseSchema = mongoose.Schema({
  exam: String, // accounting, cook, ...
  score: String, // 1, 2, ...
  validation: Date // 2020-10-10, ...
});

exports.loanSchema = mongoose.Schema({
  where: String, // Shinhan, Hana, Rush&Cash, ...
  category: String, // banks, investment fund, ...(first financial sector, second financial sector, ...)
  amount: Number // 500, 1000, 1500, ...
});

exports.loanCardSchema = mongoose.Schema({
  purpose: String,
  purpose_detail: String,
  loan_type: String, // wating lenders, immediate loan, ...
  total_amount: Number,
  min_amount: Number,
  grace_period: Number,
  payback_period: Number,
  createdAt: Date
});