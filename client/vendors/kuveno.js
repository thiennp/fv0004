(function(window, angular, undefined) {'use strict';

var urlBase = "http://ec2-54-149-98-176.us-west-2.compute.amazonaws.com:8081/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name kuveno
 * @module
 * @description
 *
 * The `kuveno` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("kuveno", ['ngResource']);

/**
 * @ngdoc object
 * @name kuveno.Meeting
 * @header kuveno.Meeting
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Meeting` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Meeting",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Meetings/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Meeting.agenda() instead.
        "prototype$__get__agenda": {
          url: urlBase + "/Meetings/:id/agenda",
          method: "GET"
        },

        // INTERNAL. Use Meeting.notes() instead.
        "prototype$__get__notes": {
          url: urlBase + "/Meetings/:id/notes",
          method: "GET"
        },

        // INTERNAL. Use Meeting.decisions.findById() instead.
        "prototype$__findById__decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.decisions.destroyById() instead.
        "prototype$__destroyById__decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.decisions.updateById() instead.
        "prototype$__updateById__decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.workgroup() instead.
        "prototype$__get__workgroup": {
          url: urlBase + "/Meetings/:id/workgroup",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.findById() instead.
        "prototype$__findById__participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.destroyById() instead.
        "prototype$__destroyById__participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.updateById() instead.
        "prototype$__updateById__participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.participants.link() instead.
        "prototype$__link__participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.participants.unlink() instead.
        "prototype$__unlink__participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.exists() instead.
        "prototype$__exists__participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Meeting.tasks.findById() instead.
        "prototype$__findById__tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks.destroyById() instead.
        "prototype$__destroyById__tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.tasks.updateById() instead.
        "prototype$__updateById__tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.files.findById() instead.
        "prototype$__findById__files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.files.destroyById() instead.
        "prototype$__destroyById__files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.files.updateById() instead.
        "prototype$__updateById__files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.decisions() instead.
        "prototype$__get__decisions": {
          isArray: true,
          url: urlBase + "/Meetings/:id/decisions",
          method: "GET"
        },

        // INTERNAL. Use Meeting.decisions.create() instead.
        "prototype$__create__decisions": {
          url: urlBase + "/Meetings/:id/decisions",
          method: "POST"
        },

        // INTERNAL. Use Meeting.decisions.destroyAll() instead.
        "prototype$__delete__decisions": {
          url: urlBase + "/Meetings/:id/decisions",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.decisions.count() instead.
        "prototype$__count__decisions": {
          url: urlBase + "/Meetings/:id/decisions/count",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants() instead.
        "prototype$__get__participants": {
          isArray: true,
          url: urlBase + "/Meetings/:id/participants",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.create() instead.
        "prototype$__create__participants": {
          url: urlBase + "/Meetings/:id/participants",
          method: "POST"
        },

        // INTERNAL. Use Meeting.participants.destroyAll() instead.
        "prototype$__delete__participants": {
          url: urlBase + "/Meetings/:id/participants",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.count() instead.
        "prototype$__count__participants": {
          url: urlBase + "/Meetings/:id/participants/count",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks() instead.
        "prototype$__get__tasks": {
          isArray: true,
          url: urlBase + "/Meetings/:id/tasks",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks.create() instead.
        "prototype$__create__tasks": {
          url: urlBase + "/Meetings/:id/tasks",
          method: "POST"
        },

        // INTERNAL. Use Meeting.tasks.destroyAll() instead.
        "prototype$__delete__tasks": {
          url: urlBase + "/Meetings/:id/tasks",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.tasks.count() instead.
        "prototype$__count__tasks": {
          url: urlBase + "/Meetings/:id/tasks/count",
          method: "GET"
        },

        // INTERNAL. Use Meeting.files() instead.
        "prototype$__get__files": {
          isArray: true,
          url: urlBase + "/Meetings/:id/files",
          method: "GET"
        },

        // INTERNAL. Use Meeting.files.create() instead.
        "prototype$__create__files": {
          url: urlBase + "/Meetings/:id/files",
          method: "POST"
        },

        // INTERNAL. Use Meeting.files.destroyAll() instead.
        "prototype$__delete__files": {
          url: urlBase + "/Meetings/:id/files",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.files.count() instead.
        "prototype$__count__files": {
          url: urlBase + "/Meetings/:id/files/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#create
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Meetings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#upsert
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Meetings",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#exists
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Meetings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#findById
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Meetings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#find
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Meetings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#findOne
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Meetings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#updateAll
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Meetings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#deleteById
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Meetings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#count
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Meetings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#prototype$updateAttributes
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Meetings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#findAll
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Find all the meetings that the current user participates in.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `meetings` – `{Array=}` - Array of Meetings
         */
        "findAll": {
          url: urlBase + "/Meetings/findAll",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Meeting#addParticipants
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Add participants to a meeting. Data format: [ {userId:<int>, isMeetingAdmin:<boolean|optional: default=false> } ]
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{number}` - 
         *
         *  - `participants` – `{array}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{array=}` - An array of the added data (Participation)
         */
        "addParticipants": {
          url: urlBase + "/Meetings/:id/addParticipants",
          method: "POST"
        },

        // INTERNAL. Use Agenda.meeting() instead.
        "::get::Agenda::meeting": {
          url: urlBase + "/Agendas/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use Notes.meeting() instead.
        "::get::Notes::meeting": {
          url: urlBase + "/Notes/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings.findById() instead.
        "::findById::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings.destroyById() instead.
        "::destroyById::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.updateById() instead.
        "::updateById::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.meetings.link() instead.
        "::link::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.meetings.unlink() instead.
        "::unlink::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.exists() instead.
        "::exists::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use KuvenoUser.meetings() instead.
        "::get::KuvenoUser::meetings": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings.create() instead.
        "::create::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.meetings.destroyAll() instead.
        "::delete::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.count() instead.
        "::count::KuvenoUser::meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/count",
          method: "GET"
        },

        // INTERNAL. Use Decision.meeting() instead.
        "::get::Decision::meeting": {
          url: urlBase + "/Decisions/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.findById() instead.
        "::findById::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.destroyById() instead.
        "::destroyById::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Workgroup.meetings.updateById() instead.
        "::updateById::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Workgroup.meetings() instead.
        "::get::Workgroup::meetings": {
          isArray: true,
          url: urlBase + "/Workgroups/:id/meetings",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.create() instead.
        "::create::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings",
          method: "POST"
        },

        // INTERNAL. Use Workgroup.meetings.destroyAll() instead.
        "::delete::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings",
          method: "DELETE"
        },

        // INTERNAL. Use Workgroup.meetings.count() instead.
        "::count::Workgroup::meetings": {
          url: urlBase + "/Workgroups/:id/meetings/count",
          method: "GET"
        },

        // INTERNAL. Use Participation.meeting() instead.
        "::get::Participation::meeting": {
          url: urlBase + "/Participations/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use Task.meeting() instead.
        "::get::Task::meeting": {
          url: urlBase + "/Tasks/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use File.meeting() instead.
        "::get::File::meeting": {
          url: urlBase + "/Files/:id/meeting",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Meeting#updateOrCreate
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Meeting#update
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Meeting#destroyById
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Meeting#removeById
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Meeting#modelName
    * @propertyOf kuveno.Meeting
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Meeting`.
    */
    R.modelName = "Meeting";


        /**
         * @ngdoc method
         * @name kuveno.Meeting#agenda
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Fetches hasOne relation agenda
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        R.agenda = function() {
          var TargetResource = $injector.get("Agenda");
          var action = TargetResource["::get::Meeting::agenda"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting#notes
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Fetches hasOne relation notes
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        R.notes = function() {
          var TargetResource = $injector.get("Notes");
          var action = TargetResource["::get::Meeting::notes"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Meeting.decisions
     * @header lbServices.Meeting.decisions
     * @object
     * @description
     *
     * The object `Meeting.decisions` groups methods
     * manipulating `Decision` instances related to `Meeting`.
     *
     * Call {@link lbServices.Meeting#decisions Meeting.decisions()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Meeting#decisions
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Queries decisions of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        R.decisions = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::get::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#count
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Counts decisions of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.decisions.count = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::count::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#create
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Creates a new instance in decisions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        R.decisions.create = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::create::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#destroyAll
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Deletes all decisions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.decisions.destroyAll = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::delete::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#destroyById
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Delete a related item by id for decisions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for decisions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.decisions.destroyById = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::destroyById::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#findById
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Find a related item by id for decisions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for decisions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        R.decisions.findById = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::findById::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.decisions#updateById
         * @methodOf kuveno.Meeting.decisions
         *
         * @description
         *
         * Update a related item by id for decisions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for decisions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        R.decisions.updateById = function() {
          var TargetResource = $injector.get("Decision");
          var action = TargetResource["::updateById::Meeting::decisions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting#workgroup
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Fetches belongsTo relation workgroup
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R.workgroup = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::get::Meeting::workgroup"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Meeting.participants
     * @header lbServices.Meeting.participants
     * @object
     * @description
     *
     * The object `Meeting.participants` groups methods
     * manipulating `KuvenoUser` instances related to `Meeting`.
     *
     * Call {@link lbServices.Meeting#participants Meeting.participants()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Meeting#participants
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Queries participants of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#count
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Counts participants of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.participants.count = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::count::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#create
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Creates a new instance in participants of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants.create = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::create::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#destroyAll
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Deletes all participants of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.participants.destroyAll = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::delete::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#destroyById
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Delete a related item by id for participants
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.participants.destroyById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::destroyById::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#exists
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Check the existence of participants relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants.exists = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::exists::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#findById
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Find a related item by id for participants
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants.findById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::findById::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#link
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Add a related item by id for participants
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants.link = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::link::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#unlink
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Remove the participants relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.participants.unlink = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::unlink::Meeting::participants"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.participants#updateById
         * @methodOf kuveno.Meeting.participants
         *
         * @description
         *
         * Update a related item by id for participants
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for participants
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.participants.updateById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::updateById::Meeting::participants"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Meeting.tasks
     * @header lbServices.Meeting.tasks
     * @object
     * @description
     *
     * The object `Meeting.tasks` groups methods
     * manipulating `Task` instances related to `Meeting`.
     *
     * Call {@link lbServices.Meeting#tasks Meeting.tasks()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Meeting#tasks
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Queries tasks of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        R.tasks = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::get::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#count
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Counts tasks of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.tasks.count = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::count::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#create
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Creates a new instance in tasks of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        R.tasks.create = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::create::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#destroyAll
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Deletes all tasks of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.tasks.destroyAll = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::delete::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#destroyById
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Delete a related item by id for tasks
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for tasks
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.tasks.destroyById = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::destroyById::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#findById
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Find a related item by id for tasks
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for tasks
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        R.tasks.findById = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::findById::Meeting::tasks"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.tasks#updateById
         * @methodOf kuveno.Meeting.tasks
         *
         * @description
         *
         * Update a related item by id for tasks
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for tasks
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        R.tasks.updateById = function() {
          var TargetResource = $injector.get("Task");
          var action = TargetResource["::updateById::Meeting::tasks"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Meeting.files
     * @header lbServices.Meeting.files
     * @object
     * @description
     *
     * The object `Meeting.files` groups methods
     * manipulating `File` instances related to `Meeting`.
     *
     * Call {@link lbServices.Meeting#files Meeting.files()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Meeting#files
         * @methodOf kuveno.Meeting
         *
         * @description
         *
         * Queries files of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::get::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#count
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Counts files of Meeting.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.files.count = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::count::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#create
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Creates a new instance in files of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.create = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::create::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#destroyAll
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Deletes all files of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.files.destroyAll = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::delete::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#destroyById
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Delete a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.files.destroyById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::destroyById::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#findById
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Find a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.findById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::findById::Meeting::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Meeting.files#updateById
         * @methodOf kuveno.Meeting.files
         *
         * @description
         *
         * Update a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.updateById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::updateById::Meeting::files"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Agenda
 * @header kuveno.Agenda
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Agenda` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Agenda",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Agendas/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Agenda.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Agendas/:id/meeting",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#create
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Agendas",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#upsert
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Agendas",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#exists
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Agendas/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#findById
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Agendas/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#find
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Agendas",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#findOne
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Agendas/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#updateAll
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Agendas/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#deleteById
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Agendas/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#count
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Agendas/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Agenda#prototype$updateAttributes
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Agendas/:id",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.agenda() instead.
        "::get::Meeting::agenda": {
          url: urlBase + "/Meetings/:id/agenda",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Agenda#updateOrCreate
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Agenda` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Agenda#update
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Agenda#destroyById
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Agenda#removeById
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Agenda#modelName
    * @propertyOf kuveno.Agenda
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Agenda`.
    */
    R.modelName = "Agenda";


        /**
         * @ngdoc method
         * @name kuveno.Agenda#meeting
         * @methodOf kuveno.Agenda
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Agenda::meeting"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Notes
 * @header kuveno.Notes
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Notes` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Notes",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Notes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Notes.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Notes/:id/meeting",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#create
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Notes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#upsert
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Notes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#exists
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Notes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#findById
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Notes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#find
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Notes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#findOne
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Notes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#updateAll
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Notes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#deleteById
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Notes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#count
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Notes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notes#prototype$updateAttributes
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Notes/:id",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.notes() instead.
        "::get::Meeting::notes": {
          url: urlBase + "/Meetings/:id/notes",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Notes#updateOrCreate
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notes` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Notes#update
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Notes#destroyById
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Notes#removeById
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Notes#modelName
    * @propertyOf kuveno.Notes
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Notes`.
    */
    R.modelName = "Notes";


        /**
         * @ngdoc method
         * @name kuveno.Notes#meeting
         * @methodOf kuveno.Notes
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Notes::meeting"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.KuvenoUser
 * @header kuveno.KuvenoUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `KuvenoUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "KuvenoUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/KuvenoUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#login
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/KuvenoUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#logout
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/KuvenoUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#confirm
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/KuvenoUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#resetPassword
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/KuvenoUsers/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__findById__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__destroyById__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__updateById__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.meetings.findById() instead.
        "prototype$__findById__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings.destroyById() instead.
        "prototype$__destroyById__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.updateById() instead.
        "prototype$__updateById__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.meetings.link() instead.
        "prototype$__link__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.meetings.unlink() instead.
        "prototype$__unlink__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.exists() instead.
        "prototype$__exists__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use KuvenoUser.emails.findById() instead.
        "prototype$__findById__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.emails.destroyById() instead.
        "prototype$__destroyById__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.updateById() instead.
        "prototype$__updateById__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.emails.link() instead.
        "prototype$__link__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.emails.unlink() instead.
        "prototype$__unlink__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.exists() instead.
        "prototype$__exists__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use KuvenoUser.files.findById() instead.
        "prototype$__findById__files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files.destroyById() instead.
        "prototype$__destroyById__files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.files.updateById() instead.
        "prototype$__updateById__files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__get__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Queries accessTokens of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__create__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__delete__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$__count__accessTokens
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Counts accessTokens of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/KuvenoUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings() instead.
        "prototype$__get__meetings": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.meetings.create() instead.
        "prototype$__create__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.meetings.destroyAll() instead.
        "prototype$__delete__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.meetings.count() instead.
        "prototype$__count__meetings": {
          url: urlBase + "/KuvenoUsers/:id/meetings/count",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.emails() instead.
        "prototype$__get__emails": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.emails.create() instead.
        "prototype$__create__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.emails.destroyAll() instead.
        "prototype$__delete__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.count() instead.
        "prototype$__count__emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/count",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files() instead.
        "prototype$__get__files": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files.create() instead.
        "prototype$__create__files": {
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.files.destroyAll() instead.
        "prototype$__delete__files": {
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.files.count() instead.
        "prototype$__count__files": {
          url: urlBase + "/KuvenoUsers/:id/files/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#create
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/KuvenoUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#upsert
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/KuvenoUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#exists
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/KuvenoUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#findById
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/KuvenoUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#find
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/KuvenoUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#findOne
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/KuvenoUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#updateAll
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/KuvenoUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#deleteById
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/KuvenoUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#count
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/KuvenoUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#prototype$updateAttributes
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/KuvenoUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#findAll
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Find all the users that this user has ever been in contact with: shared meetings, workgroups or organizations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `users` – `{Array=}` - Array of KuvenoUsers
         */
        "findAll": {
          url: urlBase + "/KuvenoUsers/findAll",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.findById() instead.
        "::findById::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.destroyById() instead.
        "::destroyById::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.updateById() instead.
        "::updateById::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.participants.link() instead.
        "::link::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.participants.unlink() instead.
        "::unlink::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.exists() instead.
        "::exists::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Meeting.participants() instead.
        "::get::Meeting::participants": {
          isArray: true,
          url: urlBase + "/Meetings/:id/participants",
          method: "GET"
        },

        // INTERNAL. Use Meeting.participants.create() instead.
        "::create::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants",
          method: "POST"
        },

        // INTERNAL. Use Meeting.participants.destroyAll() instead.
        "::delete::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.participants.count() instead.
        "::count::Meeting::participants": {
          url: urlBase + "/Meetings/:id/participants/count",
          method: "GET"
        },

        // INTERNAL. Use Participation.kuvenoUser() instead.
        "::get::Participation::kuvenoUser": {
          url: urlBase + "/Participations/:id/kuvenoUser",
          method: "GET"
        },

        // INTERNAL. Use Task.owner() instead.
        "::get::Task::owner": {
          url: urlBase + "/Tasks/:id/owner",
          method: "GET"
        },

        // INTERNAL. Use Task.assignedBy() instead.
        "::get::Task::assignedBy": {
          url: urlBase + "/Tasks/:id/assignedBy",
          method: "GET"
        },

        // INTERNAL. Use Notification.owner() instead.
        "::get::Notification::owner": {
          url: urlBase + "/Notifications/:id/owner",
          method: "GET"
        },

        // INTERNAL. Use EmailData.sender() instead.
        "::get::EmailData::sender": {
          url: urlBase + "/EmailData/:id/sender",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.findById() instead.
        "::findById::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.destroyById() instead.
        "::destroyById::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.updateById() instead.
        "::updateById::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "PUT"
        },

        // INTERNAL. Use EmailData.recipients.link() instead.
        "::link::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use EmailData.recipients.unlink() instead.
        "::unlink::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.exists() instead.
        "::exists::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use EmailData.recipients() instead.
        "::get::EmailData::recipients": {
          isArray: true,
          url: urlBase + "/EmailData/:id/recipients",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.create() instead.
        "::create::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients",
          method: "POST"
        },

        // INTERNAL. Use EmailData.recipients.destroyAll() instead.
        "::delete::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.count() instead.
        "::count::EmailData::recipients": {
          url: urlBase + "/EmailData/:id/recipients/count",
          method: "GET"
        },

        // INTERNAL. Use UserEmailData.kuvenoUser() instead.
        "::get::UserEmailData::kuvenoUser": {
          url: urlBase + "/UserEmailData/:id/kuvenoUser",
          method: "GET"
        },

        // INTERNAL. Use File.owner() instead.
        "::get::File::owner": {
          url: urlBase + "/Files/:id/owner",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#getCurrent
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/KuvenoUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#updateOrCreate
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#update
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#destroyById
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#removeById
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#getCachedCurrent
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link kuveno.KuvenoUser#login} or
         * {@link kuveno.KuvenoUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A KuvenoUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#isAuthenticated
         * @methodOf kuveno.KuvenoUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#getCurrentId
         * @methodOf kuveno.KuvenoUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name kuveno.KuvenoUser#modelName
    * @propertyOf kuveno.KuvenoUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `KuvenoUser`.
    */
    R.modelName = "KuvenoUser";

    /**
     * @ngdoc object
     * @name lbServices.KuvenoUser.meetings
     * @header lbServices.KuvenoUser.meetings
     * @object
     * @description
     *
     * The object `KuvenoUser.meetings` groups methods
     * manipulating `Meeting` instances related to `KuvenoUser`.
     *
     * Call {@link lbServices.KuvenoUser#meetings KuvenoUser.meetings()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#meetings
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Queries meetings of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#count
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Counts meetings of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.meetings.count = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::count::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#create
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Creates a new instance in meetings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.create = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::create::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#destroyAll
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Deletes all meetings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.meetings.destroyAll = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::delete::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#destroyById
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Delete a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.meetings.destroyById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::destroyById::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#exists
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Check the existence of meetings relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.exists = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::exists::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#findById
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Find a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.findById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::findById::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#link
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Add a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.link = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::link::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#unlink
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Remove the meetings relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.meetings.unlink = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::unlink::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.meetings#updateById
         * @methodOf kuveno.KuvenoUser.meetings
         *
         * @description
         *
         * Update a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.updateById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::updateById::KuvenoUser::meetings"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.KuvenoUser.emails
     * @header lbServices.KuvenoUser.emails
     * @object
     * @description
     *
     * The object `KuvenoUser.emails` groups methods
     * manipulating `EmailData` instances related to `KuvenoUser`.
     *
     * Call {@link lbServices.KuvenoUser#emails KuvenoUser.emails()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#emails
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Queries emails of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::get::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#count
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Counts emails of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.emails.count = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::count::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#create
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Creates a new instance in emails of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails.create = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::create::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#destroyAll
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Deletes all emails of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.emails.destroyAll = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::delete::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#destroyById
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Delete a related item by id for emails
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.emails.destroyById = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::destroyById::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#exists
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Check the existence of emails relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails.exists = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::exists::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#findById
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Find a related item by id for emails
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails.findById = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::findById::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#link
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Add a related item by id for emails
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails.link = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::link::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#unlink
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Remove the emails relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.emails.unlink = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::unlink::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.emails#updateById
         * @methodOf kuveno.KuvenoUser.emails
         *
         * @description
         *
         * Update a related item by id for emails
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for emails
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emails.updateById = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::updateById::KuvenoUser::emails"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.KuvenoUser.files
     * @header lbServices.KuvenoUser.files
     * @object
     * @description
     *
     * The object `KuvenoUser.files` groups methods
     * manipulating `File` instances related to `KuvenoUser`.
     *
     * Call {@link lbServices.KuvenoUser#files KuvenoUser.files()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser#files
         * @methodOf kuveno.KuvenoUser
         *
         * @description
         *
         * Queries files of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::get::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#count
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Counts files of KuvenoUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.files.count = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::count::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#create
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Creates a new instance in files of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.create = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::create::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#destroyAll
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Deletes all files of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.files.destroyAll = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::delete::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#destroyById
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Delete a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.files.destroyById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::destroyById::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#findById
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Find a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.findById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::findById::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.KuvenoUser.files#updateById
         * @methodOf kuveno.KuvenoUser.files
         *
         * @description
         *
         * Update a related item by id for files
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for files
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R.files.updateById = function() {
          var TargetResource = $injector.get("File");
          var action = TargetResource["::updateById::KuvenoUser::files"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Decision
 * @header kuveno.Decision
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Decision` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Decision",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Decisions/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Decision.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Decisions/:id/meeting",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#create
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Decisions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#upsert
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Decisions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#exists
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Decisions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#findById
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Decisions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#find
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Decisions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#findOne
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Decisions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#updateAll
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Decisions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#deleteById
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Decisions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#count
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Decisions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Decision#prototype$updateAttributes
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Decisions/:id",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.decisions.findById() instead.
        "::findById::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.decisions.destroyById() instead.
        "::destroyById::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.decisions.updateById() instead.
        "::updateById::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.decisions() instead.
        "::get::Meeting::decisions": {
          isArray: true,
          url: urlBase + "/Meetings/:id/decisions",
          method: "GET"
        },

        // INTERNAL. Use Meeting.decisions.create() instead.
        "::create::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions",
          method: "POST"
        },

        // INTERNAL. Use Meeting.decisions.destroyAll() instead.
        "::delete::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.decisions.count() instead.
        "::count::Meeting::decisions": {
          url: urlBase + "/Meetings/:id/decisions/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Decision#updateOrCreate
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Decision` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Decision#update
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Decision#destroyById
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Decision#removeById
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Decision#modelName
    * @propertyOf kuveno.Decision
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Decision`.
    */
    R.modelName = "Decision";


        /**
         * @ngdoc method
         * @name kuveno.Decision#meeting
         * @methodOf kuveno.Decision
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Decision::meeting"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Organization
 * @header kuveno.Organization
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Organization` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Organization",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Organizations/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Organization.workgroups.findById() instead.
        "prototype$__findById__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.workgroups.destroyById() instead.
        "prototype$__destroyById__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.workgroups.updateById() instead.
        "prototype$__updateById__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.workgroups() instead.
        "prototype$__get__workgroups": {
          isArray: true,
          url: urlBase + "/Organizations/:id/workgroups",
          method: "GET"
        },

        // INTERNAL. Use Organization.workgroups.create() instead.
        "prototype$__create__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups",
          method: "POST"
        },

        // INTERNAL. Use Organization.workgroups.destroyAll() instead.
        "prototype$__delete__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.workgroups.count() instead.
        "prototype$__count__workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#create
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Organizations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#upsert
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Organizations",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#exists
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Organizations/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#findById
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Organizations/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#find
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Organizations",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#findOne
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Organizations/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#updateAll
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Organizations/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#deleteById
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Organizations/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#count
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Organizations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Organization#prototype$updateAttributes
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Organizations/:id",
          method: "PUT"
        },

        // INTERNAL. Use Workgroup.organization() instead.
        "::get::Workgroup::organization": {
          url: urlBase + "/Workgroups/:id/organization",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Organization#updateOrCreate
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Organization#update
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Organization#destroyById
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Organization#removeById
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Organization#modelName
    * @propertyOf kuveno.Organization
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Organization`.
    */
    R.modelName = "Organization";

    /**
     * @ngdoc object
     * @name lbServices.Organization.workgroups
     * @header lbServices.Organization.workgroups
     * @object
     * @description
     *
     * The object `Organization.workgroups` groups methods
     * manipulating `Workgroup` instances related to `Organization`.
     *
     * Call {@link lbServices.Organization#workgroups Organization.workgroups()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Organization#workgroups
         * @methodOf kuveno.Organization
         *
         * @description
         *
         * Queries workgroups of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R.workgroups = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::get::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#count
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Counts workgroups of Organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.workgroups.count = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::count::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#create
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Creates a new instance in workgroups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R.workgroups.create = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::create::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#destroyAll
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Deletes all workgroups of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.workgroups.destroyAll = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::delete::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#destroyById
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Delete a related item by id for workgroups
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for workgroups
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.workgroups.destroyById = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::destroyById::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#findById
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Find a related item by id for workgroups
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for workgroups
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R.workgroups.findById = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::findById::Organization::workgroups"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Organization.workgroups#updateById
         * @methodOf kuveno.Organization.workgroups
         *
         * @description
         *
         * Update a related item by id for workgroups
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for workgroups
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R.workgroups.updateById = function() {
          var TargetResource = $injector.get("Workgroup");
          var action = TargetResource["::updateById::Organization::workgroups"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Workgroup
 * @header kuveno.Workgroup
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Workgroup` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Workgroup",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Workgroups/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Workgroup.organization() instead.
        "prototype$__get__organization": {
          url: urlBase + "/Workgroups/:id/organization",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.findById() instead.
        "prototype$__findById__meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.destroyById() instead.
        "prototype$__destroyById__meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Workgroup.meetings.updateById() instead.
        "prototype$__updateById__meetings": {
          url: urlBase + "/Workgroups/:id/meetings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Workgroup.meetings() instead.
        "prototype$__get__meetings": {
          isArray: true,
          url: urlBase + "/Workgroups/:id/meetings",
          method: "GET"
        },

        // INTERNAL. Use Workgroup.meetings.create() instead.
        "prototype$__create__meetings": {
          url: urlBase + "/Workgroups/:id/meetings",
          method: "POST"
        },

        // INTERNAL. Use Workgroup.meetings.destroyAll() instead.
        "prototype$__delete__meetings": {
          url: urlBase + "/Workgroups/:id/meetings",
          method: "DELETE"
        },

        // INTERNAL. Use Workgroup.meetings.count() instead.
        "prototype$__count__meetings": {
          url: urlBase + "/Workgroups/:id/meetings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#create
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Workgroups",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#upsert
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Workgroups",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#exists
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Workgroups/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#findById
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Workgroups/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#find
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Workgroups",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#findOne
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Workgroups/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#updateAll
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Workgroups/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#deleteById
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Workgroups/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#count
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Workgroups/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#prototype$updateAttributes
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Workgroups/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#findAll
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Find all the workgroups that the current user participates in.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `workgroups` – `{Array=}` - Array of Workgroups
         */
        "findAll": {
          url: urlBase + "/Workgroups/findAll",
          method: "GET"
        },

        // INTERNAL. Use Meeting.workgroup() instead.
        "::get::Meeting::workgroup": {
          url: urlBase + "/Meetings/:id/workgroup",
          method: "GET"
        },

        // INTERNAL. Use Organization.workgroups.findById() instead.
        "::findById::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "GET"
        },

        // INTERNAL. Use Organization.workgroups.destroyById() instead.
        "::destroyById::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.workgroups.updateById() instead.
        "::updateById::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Organization.workgroups() instead.
        "::get::Organization::workgroups": {
          isArray: true,
          url: urlBase + "/Organizations/:id/workgroups",
          method: "GET"
        },

        // INTERNAL. Use Organization.workgroups.create() instead.
        "::create::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups",
          method: "POST"
        },

        // INTERNAL. Use Organization.workgroups.destroyAll() instead.
        "::delete::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups",
          method: "DELETE"
        },

        // INTERNAL. Use Organization.workgroups.count() instead.
        "::count::Organization::workgroups": {
          url: urlBase + "/Organizations/:id/workgroups/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Workgroup#updateOrCreate
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workgroup` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#update
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#destroyById
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Workgroup#removeById
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Workgroup#modelName
    * @propertyOf kuveno.Workgroup
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Workgroup`.
    */
    R.modelName = "Workgroup";


        /**
         * @ngdoc method
         * @name kuveno.Workgroup#organization
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Fetches belongsTo relation organization
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Organization` object.)
         * </em>
         */
        R.organization = function() {
          var TargetResource = $injector.get("Organization");
          var action = TargetResource["::get::Workgroup::organization"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Workgroup.meetings
     * @header lbServices.Workgroup.meetings
     * @object
     * @description
     *
     * The object `Workgroup.meetings` groups methods
     * manipulating `Meeting` instances related to `Workgroup`.
     *
     * Call {@link lbServices.Workgroup#meetings Workgroup.meetings()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.Workgroup#meetings
         * @methodOf kuveno.Workgroup
         *
         * @description
         *
         * Queries meetings of Workgroup.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#count
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Counts meetings of Workgroup.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.meetings.count = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::count::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#create
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Creates a new instance in meetings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.create = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::create::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#destroyAll
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Deletes all meetings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.meetings.destroyAll = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::delete::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#destroyById
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Delete a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.meetings.destroyById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::destroyById::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#findById
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Find a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.findById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::findById::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Workgroup.meetings#updateById
         * @methodOf kuveno.Workgroup.meetings
         *
         * @description
         *
         * Update a related item by id for meetings
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for meetings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meetings.updateById = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::updateById::Workgroup::meetings"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Participation
 * @header kuveno.Participation
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Participation` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Participation",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Participations/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Participation.kuvenoUser() instead.
        "prototype$__get__kuvenoUser": {
          url: urlBase + "/Participations/:id/kuvenoUser",
          method: "GET"
        },

        // INTERNAL. Use Participation.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Participations/:id/meeting",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#create
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Participations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#upsert
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Participations",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#exists
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Participations/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#findById
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Participations/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#find
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Participations",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#findOne
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Participations/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#updateAll
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Participations/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#deleteById
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Participations/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#count
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Participations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Participation#prototype$updateAttributes
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Participations/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Participation#updateOrCreate
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Participation` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Participation#update
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Participation#destroyById
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Participation#removeById
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Participation#modelName
    * @propertyOf kuveno.Participation
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Participation`.
    */
    R.modelName = "Participation";


        /**
         * @ngdoc method
         * @name kuveno.Participation#kuvenoUser
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Fetches belongsTo relation kuvenoUser
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.kuvenoUser = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::Participation::kuvenoUser"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Participation#meeting
         * @methodOf kuveno.Participation
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Participation::meeting"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Task
 * @header kuveno.Task
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Task` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Task",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Tasks/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Task.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Tasks/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use Task.owner() instead.
        "prototype$__get__owner": {
          url: urlBase + "/Tasks/:id/owner",
          method: "GET"
        },

        // INTERNAL. Use Task.assignedBy() instead.
        "prototype$__get__assignedBy": {
          url: urlBase + "/Tasks/:id/assignedBy",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#create
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Tasks",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#upsert
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Tasks",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#exists
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Tasks/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#findById
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Tasks/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#find
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Tasks",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#findOne
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Tasks/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#updateAll
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Tasks/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#deleteById
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Tasks/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#count
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Tasks/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#prototype$updateAttributes
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Tasks/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Task#findAll
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Find all the tasks that the current user is allowed to see.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `tasks` – `{Array=}` - Array of Tasks
         */
        "findAll": {
          url: urlBase + "/Tasks/findAll",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks.findById() instead.
        "::findById::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks.destroyById() instead.
        "::destroyById::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.tasks.updateById() instead.
        "::updateById::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.tasks() instead.
        "::get::Meeting::tasks": {
          isArray: true,
          url: urlBase + "/Meetings/:id/tasks",
          method: "GET"
        },

        // INTERNAL. Use Meeting.tasks.create() instead.
        "::create::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks",
          method: "POST"
        },

        // INTERNAL. Use Meeting.tasks.destroyAll() instead.
        "::delete::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.tasks.count() instead.
        "::count::Meeting::tasks": {
          url: urlBase + "/Meetings/:id/tasks/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Task#updateOrCreate
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Task` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Task#update
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Task#destroyById
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Task#removeById
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Task#modelName
    * @propertyOf kuveno.Task
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Task`.
    */
    R.modelName = "Task";


        /**
         * @ngdoc method
         * @name kuveno.Task#meeting
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::Task::meeting"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Task#owner
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Fetches belongsTo relation owner
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.owner = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::Task::owner"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.Task#assignedBy
         * @methodOf kuveno.Task
         *
         * @description
         *
         * Fetches belongsTo relation assignedBy
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.assignedBy = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::Task::assignedBy"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Notification
 * @header kuveno.Notification
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Notification` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Notification",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Notifications/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Notification.owner() instead.
        "prototype$__get__owner": {
          url: urlBase + "/Notifications/:id/owner",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#create
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Notifications",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#upsert
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Notifications",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#exists
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Notifications/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#findById
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Notifications/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#find
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Notifications",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#findOne
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Notifications/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#updateAll
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Notifications/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#deleteById
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Notifications/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#count
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Notifications/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#prototype$updateAttributes
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Notifications/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.Notification#findAll
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Find all the notifications of the current user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `notifications` – `{Array=}` - Array of Notifications
         */
        "findAll": {
          url: urlBase + "/Notifications/findAll",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.Notification#updateOrCreate
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notification` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.Notification#update
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.Notification#destroyById
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.Notification#removeById
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.Notification#modelName
    * @propertyOf kuveno.Notification
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Notification`.
    */
    R.modelName = "Notification";


        /**
         * @ngdoc method
         * @name kuveno.Notification#owner
         * @methodOf kuveno.Notification
         *
         * @description
         *
         * Fetches belongsTo relation owner
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.owner = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::Notification::owner"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.EmailData
 * @header kuveno.EmailData
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `EmailData` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "EmailData",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/EmailData/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use EmailData.sender() instead.
        "prototype$__get__sender": {
          url: urlBase + "/EmailData/:id/sender",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.findById() instead.
        "prototype$__findById__recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.destroyById() instead.
        "prototype$__destroyById__recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.updateById() instead.
        "prototype$__updateById__recipients": {
          url: urlBase + "/EmailData/:id/recipients/:fk",
          method: "PUT"
        },

        // INTERNAL. Use EmailData.recipients.link() instead.
        "prototype$__link__recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use EmailData.recipients.unlink() instead.
        "prototype$__unlink__recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.exists() instead.
        "prototype$__exists__recipients": {
          url: urlBase + "/EmailData/:id/recipients/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use EmailData.recipients() instead.
        "prototype$__get__recipients": {
          isArray: true,
          url: urlBase + "/EmailData/:id/recipients",
          method: "GET"
        },

        // INTERNAL. Use EmailData.recipients.create() instead.
        "prototype$__create__recipients": {
          url: urlBase + "/EmailData/:id/recipients",
          method: "POST"
        },

        // INTERNAL. Use EmailData.recipients.destroyAll() instead.
        "prototype$__delete__recipients": {
          url: urlBase + "/EmailData/:id/recipients",
          method: "DELETE"
        },

        // INTERNAL. Use EmailData.recipients.count() instead.
        "prototype$__count__recipients": {
          url: urlBase + "/EmailData/:id/recipients/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#create
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/EmailData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#upsert
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/EmailData",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#exists
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/EmailData/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#findById
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/EmailData/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#find
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/EmailData",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#findOne
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/EmailData/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#updateAll
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/EmailData/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#deleteById
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/EmailData/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#count
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/EmailData/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#prototype$updateAttributes
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/EmailData/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.EmailData#addRecipients
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Add recipients of an email. Data format: [{userId:<int>, type:"cc/bcc/<empty>"]
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{number}` - 
         *
         *  - `recipients` – `{array}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{array=}` - An array of the added data (UserEmailData)
         */
        "addRecipients": {
          url: urlBase + "/EmailData/:id/addRecipients",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.emails.findById() instead.
        "::findById::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.emails.destroyById() instead.
        "::destroyById::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.updateById() instead.
        "::updateById::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.emails.link() instead.
        "::link::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.emails.unlink() instead.
        "::unlink::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.exists() instead.
        "::exists::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use KuvenoUser.emails() instead.
        "::get::KuvenoUser::emails": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.emails.create() instead.
        "::create::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.emails.destroyAll() instead.
        "::delete::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.emails.count() instead.
        "::count::KuvenoUser::emails": {
          url: urlBase + "/KuvenoUsers/:id/emails/count",
          method: "GET"
        },

        // INTERNAL. Use UserEmailData.emailData() instead.
        "::get::UserEmailData::emailData": {
          url: urlBase + "/UserEmailData/:id/emailData",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.EmailData#updateOrCreate
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.EmailData#update
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.EmailData#destroyById
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.EmailData#removeById
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.EmailData#modelName
    * @propertyOf kuveno.EmailData
    * @description
    * The name of the model represented by this $resource,
    * i.e. `EmailData`.
    */
    R.modelName = "EmailData";


        /**
         * @ngdoc method
         * @name kuveno.EmailData#sender
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Fetches belongsTo relation sender
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.sender = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::EmailData::sender"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.EmailData.recipients
     * @header lbServices.EmailData.recipients
     * @object
     * @description
     *
     * The object `EmailData.recipients` groups methods
     * manipulating `KuvenoUser` instances related to `EmailData`.
     *
     * Call {@link lbServices.EmailData#recipients EmailData.recipients()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name kuveno.EmailData#recipients
         * @methodOf kuveno.EmailData
         *
         * @description
         *
         * Queries recipients of EmailData.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#count
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Counts recipients of EmailData.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.recipients.count = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::count::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#create
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Creates a new instance in recipients of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients.create = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::create::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#destroyAll
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Deletes all recipients of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.recipients.destroyAll = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::delete::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#destroyById
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Delete a related item by id for recipients
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.recipients.destroyById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::destroyById::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#exists
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Check the existence of recipients relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients.exists = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::exists::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#findById
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Find a related item by id for recipients
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients.findById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::findById::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#link
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Add a related item by id for recipients
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients.link = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::link::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#unlink
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Remove the recipients relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.recipients.unlink = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::unlink::EmailData::recipients"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.EmailData.recipients#updateById
         * @methodOf kuveno.EmailData.recipients
         *
         * @description
         *
         * Update a related item by id for recipients
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recipients
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.recipients.updateById = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::updateById::EmailData::recipients"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.UserEmailData
 * @header kuveno.UserEmailData
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserEmailData` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "UserEmailData",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/UserEmailData/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use UserEmailData.kuvenoUser() instead.
        "prototype$__get__kuvenoUser": {
          url: urlBase + "/UserEmailData/:id/kuvenoUser",
          method: "GET"
        },

        // INTERNAL. Use UserEmailData.emailData() instead.
        "prototype$__get__emailData": {
          url: urlBase + "/UserEmailData/:id/emailData",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#create
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/UserEmailData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#upsert
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/UserEmailData",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#exists
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/UserEmailData/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#findById
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/UserEmailData/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#find
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/UserEmailData",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#findOne
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/UserEmailData/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#updateAll
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/UserEmailData/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#deleteById
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/UserEmailData/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#count
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/UserEmailData/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#prototype$updateAttributes
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/UserEmailData/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#updateOrCreate
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserEmailData` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#update
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#destroyById
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#removeById
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.UserEmailData#modelName
    * @propertyOf kuveno.UserEmailData
    * @description
    * The name of the model represented by this $resource,
    * i.e. `UserEmailData`.
    */
    R.modelName = "UserEmailData";


        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#kuvenoUser
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Fetches belongsTo relation kuvenoUser
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.kuvenoUser = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::UserEmailData::kuvenoUser"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.UserEmailData#emailData
         * @methodOf kuveno.UserEmailData
         *
         * @description
         *
         * Fetches belongsTo relation emailData
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EmailData` object.)
         * </em>
         */
        R.emailData = function() {
          var TargetResource = $injector.get("EmailData");
          var action = TargetResource["::get::UserEmailData::emailData"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.Container
 * @header kuveno.Container
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Container` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Container",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/containers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name kuveno.Container#getContainers
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getContainers": {
          isArray: true,
          url: urlBase + "/containers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#createContainer
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "createContainer": {
          url: urlBase + "/containers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#destroyContainer
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "destroyContainer": {
          url: urlBase + "/containers/:container",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#getContainer
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getContainer": {
          url: urlBase + "/containers/:container",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#getFiles
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getFiles": {
          isArray: true,
          url: urlBase + "/containers/:container/files",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#getFile
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getFile": {
          url: urlBase + "/containers/:container/files/:file",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#removeFile
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "removeFile": {
          url: urlBase + "/containers/:container/files/:file",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#upload
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `result` – `{object=}` - 
         */
        "upload": {
          url: urlBase + "/containers/:container/upload",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.Container#download
         * @methodOf kuveno.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "download": {
          url: urlBase + "/containers/:container/download/:file",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name kuveno.Container#modelName
    * @propertyOf kuveno.Container
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Container`.
    */
    R.modelName = "Container";


    return R;
  }]);

/**
 * @ngdoc object
 * @name kuveno.File
 * @header kuveno.File
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `File` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "File",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Files/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use File.meeting() instead.
        "prototype$__get__meeting": {
          url: urlBase + "/Files/:id/meeting",
          method: "GET"
        },

        // INTERNAL. Use File.owner() instead.
        "prototype$__get__owner": {
          url: urlBase + "/Files/:id/owner",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#create
         * @methodOf kuveno.File
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Files",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#upsert
         * @methodOf kuveno.File
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Files",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#exists
         * @methodOf kuveno.File
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Files/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#findById
         * @methodOf kuveno.File
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Files/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#find
         * @methodOf kuveno.File
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Files",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#findOne
         * @methodOf kuveno.File
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Files/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#updateAll
         * @methodOf kuveno.File
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Files/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#deleteById
         * @methodOf kuveno.File
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Files/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#count
         * @methodOf kuveno.File
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Files/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name kuveno.File#prototype$updateAttributes
         * @methodOf kuveno.File
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Files/:id",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.files.findById() instead.
        "::findById::Meeting::files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "GET"
        },

        // INTERNAL. Use Meeting.files.destroyById() instead.
        "::destroyById::Meeting::files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.files.updateById() instead.
        "::updateById::Meeting::files": {
          url: urlBase + "/Meetings/:id/files/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Meeting.files() instead.
        "::get::Meeting::files": {
          isArray: true,
          url: urlBase + "/Meetings/:id/files",
          method: "GET"
        },

        // INTERNAL. Use Meeting.files.create() instead.
        "::create::Meeting::files": {
          url: urlBase + "/Meetings/:id/files",
          method: "POST"
        },

        // INTERNAL. Use Meeting.files.destroyAll() instead.
        "::delete::Meeting::files": {
          url: urlBase + "/Meetings/:id/files",
          method: "DELETE"
        },

        // INTERNAL. Use Meeting.files.count() instead.
        "::count::Meeting::files": {
          url: urlBase + "/Meetings/:id/files/count",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files.findById() instead.
        "::findById::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files.destroyById() instead.
        "::destroyById::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.files.updateById() instead.
        "::updateById::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files/:fk",
          method: "PUT"
        },

        // INTERNAL. Use KuvenoUser.files() instead.
        "::get::KuvenoUser::files": {
          isArray: true,
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "GET"
        },

        // INTERNAL. Use KuvenoUser.files.create() instead.
        "::create::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "POST"
        },

        // INTERNAL. Use KuvenoUser.files.destroyAll() instead.
        "::delete::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files",
          method: "DELETE"
        },

        // INTERNAL. Use KuvenoUser.files.count() instead.
        "::count::KuvenoUser::files": {
          url: urlBase + "/KuvenoUsers/:id/files/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name kuveno.File#updateOrCreate
         * @methodOf kuveno.File
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `File` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name kuveno.File#update
         * @methodOf kuveno.File
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name kuveno.File#destroyById
         * @methodOf kuveno.File
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name kuveno.File#removeById
         * @methodOf kuveno.File
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name kuveno.File#modelName
    * @propertyOf kuveno.File
    * @description
    * The name of the model represented by this $resource,
    * i.e. `File`.
    */
    R.modelName = "File";


        /**
         * @ngdoc method
         * @name kuveno.File#meeting
         * @methodOf kuveno.File
         *
         * @description
         *
         * Fetches belongsTo relation meeting
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meeting` object.)
         * </em>
         */
        R.meeting = function() {
          var TargetResource = $injector.get("Meeting");
          var action = TargetResource["::get::File::meeting"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name kuveno.File#owner
         * @methodOf kuveno.File
         *
         * @description
         *
         * Fetches belongsTo relation owner
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `KuvenoUser` object.)
         * </em>
         */
        R.owner = function() {
          var TargetResource = $injector.get("KuvenoUser");
          var action = TargetResource["::get::File::owner"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name kuveno.LoopBackResourceProvider
   * @header kuveno.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name kuveno.LoopBackResourceProvider#setAuthHeader
     * @methodOf kuveno.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name kuveno.LoopBackResourceProvider#setUrlBase
     * @methodOf kuveno.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
