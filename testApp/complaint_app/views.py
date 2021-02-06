from rest_framework import viewsets
from .models import UserProfile, Complaint, User
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):
        queryset = Complaint.objects.all()
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):
        queryset = Complaint.objects.all().filter(closedate=None)
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):
        queryset = Complaint.objects.all().exclude(closedate=None)
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class TopComplaintTypeViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):

        districtList = [None] * 51
        # for i in range(51):
        #     districtList[i] = {}

        complaint_types = Complaint.objects.values(
            'complaint_type', 'account').exclude(complaint_type=None)

        for complaint in complaint_types:
            district = complaint['account']
            districtNum = district[4:]

            districtIndex = int(districtNum) - 1
            districtMap = districtList[districtIndex]
            if districtMap == None:
                districtMap = {}
            complaint_type = complaint['complaint_type']

            if complaint_type not in districtMap:
                districtMap[complaint_type] = 1
            else:
                districtMap[complaint_type] += 1

            districtList[districtIndex] = districtMap

        # for complaint in complaintsMap:

        # queryset = Complaint.objects.all().filter(
        #     account="NYCC" + request.data['account'])

        # serializer = ComplaintSerializer(queryset, many=True)
        return Response(districtList)


class ConstituentComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):
        queryset = Complaint.objects.all()
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)
