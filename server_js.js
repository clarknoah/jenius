createSchemaProperty = function(payload){
  
  };


exports.createSchemaRel = function(req, res){
  var params = {};
  params.srcId = req.body.srcId;
  params.tgtId = req.body.tgtId;
  params.relName = req.body.relName;
  
  query = "START srcNode = node({srcId}), tgtNode=node({tgtId})",
          "MATCH (srcNode)<-[:source_schema_rel]-(rel:Schema_Relationship{",
          "relationship_name:{relName},",
          "created_on:timestamp()",
          "})".join('\n');
};
