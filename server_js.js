createSchemaProperty = function(payload){
  
  };


exports.createSchemaRel = function(req, res){
  var params = {};
  params.srcId = req.body.srcId;
  params.tgtId = req.body.tgtId;
  params.relName = req.body.relName;
  
  query = "START srcNode = node({srcId}), tgtNode=node({tgtId})",
          "CREATE (srcNode:Schema_Node)<-[:source_schema_rel]-(rel:Schema_Relationship{",
          "relationship_name:{relName},",
          "created_on:timestamp()",
          "})-[:target_schema_rel]->(tgtNode:Schema_Node)".join('\n');
};


exports.getSchemaRels = function(req, res){
  var params={};
  
  query = "MATCH (srcNode:Schema_Node)<-[:source_schema_rel]-",
          "(n:Schema_Relationship)-[:target_schema_rel]->(tgtNode:Schema_Node)",
          "RETURN collect(distinct{",
          "schemaRelId:ID(n),",
          "srcId:ID(srcNode),",
          "tgtId:ID(tgtNode),",
          "relName:n.relationship_name",
          "}) as schemaRels".join(''\n');
};

exports.getSchemaNodeRels = function(req, res){
  var params={};
  params.nodeId = req.body.nodeId;
  
  query = "START n=node({nodeId})",
          "MATCH (n:Schema_Node)<-[ren:target_schema_rel|source_schema_rel]-(r:Schema_Relationship)",
          "-[ret:target_schema_rel|source_schema_rel]->(otherNode:Schema_Node)",
          "RETURN collect(distinct{",
          "schemaRelId:ID(r),",
          "direction:type(ren)"
          "schemaNodeId:ID(n),",
          "otherNodeId:ID(otherNode),",
          "relName:r.relationship_name",
          "}) as schemaNodeRels".join(''\n');
          
  db.query(query, params, function (err, results) {
  if (err) throw err;
  var likes = results.map(function (result) {
    return result['other'];
  });
  // ...
});        
          
};
